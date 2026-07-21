// scripts/prerender.mjs
//
// Build-time prerendering for a plain Vite + React Router SPA (no Next.js/
// Remix in the stack, so a framework migration would be disproportionate).
//
// Approach: serve the freshly-built dist/ as a normal SPA on localhost,
// drive a headless Chromium (Puppeteer) to each known route, wait for React
// to mount and Helmet to write its tags into <head>, then save the fully
// rendered document.documentElement.outerHTML to dist/<route>/index.html.
// The original dist/index.html (built by Vite) becomes the prerendered
// homepage; every other route gets its own nested index.html.
//
// This is purely additive: the JS bundle Vite already built is untouched
// and still loads on top of the static HTML, so React hydrates normally and
// all existing client-side interactivity (routing, animations, forms)
// keeps working exactly as before. Crawlers and no-JS clients now see real
// content in the initial HTML instead of an empty <div id="root">.
//
// LIMITATION (flagged, not silently worked around): routes that render
// content fetched live from the Django API at runtime — the blog list,
// individual blog posts, and the careers job-listing widget — will
// prerender with whatever the API returns AT BUILD TIME, or an empty/
// loading state if the API isn't reachable from wherever `npm run build`
// executes. They are included in the crawl list below on a best-effort
// basis; if the build machine can't reach the API, remove them from
// ROUTES_REQUIRING_API and they'll simply keep working as pure
// client-side-rendered pages (as they do today), just without prerendered
// HTML for that specific content.

import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import http from 'node:http'
import handler from 'serve-handler'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, '..', 'dist')
const PORT = 4174

// Static, data-independent routes — safe to prerender unconditionally.
const STATIC_ROUTES = [
  '/',
  '/products',
  '/products/uav-systems',
  '/products/mvtx',
  '/products/artificial-intelligence',
  '/products/advanced-engineering',
  '/sectors',
  '/sectors/defence-homeland-security',
  '/sectors/government-smart-infrastructure',
  '/sectors/energy-industrial-critical-infrastructure',
  '/sectors/agriculture-environmental-intelligence',
  '/sectors/mining-surveying-research',
  '/technology',
  '/about',
  '/contact',
  '/careers', // shell prerenders fine; the live job-listing list itself needs the API, see note above
  '/blog',    // shell only — see ROUTES_REQUIRING_API note
]

// Routes that depend on live backend data and are attempted only if
// VITE_API_BASE_URL is reachable from this machine. Left empty by default —
// enable per-post prerendering once there's an agreed approach for pulling
// the published slug list at build time (see INSTRUCTIONS.md).
const ROUTES_REQUIRING_API = []

const ROUTES = [...STATIC_ROUTES, ...ROUTES_REQUIRING_API]

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) =>
      handler(req, res, { public: DIST_DIR, rewrites: [{ source: '**', destination: '/index.html' }] })
    )
    server.listen(PORT, () => resolve(server))
  })
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error('[prerender] dist/ not found — run `vite build` first (this runs as postbuild).')
    process.exit(1)
  }

  const server = await startServer()
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })

  const results = []

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      const url = `http://localhost:${PORT}${route}`
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
        // App shows a branded 1.6s loading screen before mounting real
        // content (useLoadingScreen in hooks/index.js) — wait past it, then
        // for the Navbar (present on every non-loading route) as a mount signal.
        await page.waitForSelector('nav', { timeout: 15000 })
        // Small settle buffer for Helmet's effect-based tag writes and any
        // late layout-affecting animation class toggles.
        await new Promise((r) => setTimeout(r, 300))
        const html = await page.evaluate(() => document.documentElement.outerHTML)
        results.push({ route, html })
        console.log(`[prerender] captured ${route}`)
      } catch (err) {
        console.warn(`[prerender] FAILED to capture ${route}: ${err.message} — leaving original SPA index.html for this route`)
      } finally {
        await page.close()
      }
    }
  } finally {
    await browser.close()
    server.close()
  }

  for (const { route, html } of results) {
    const outPath =
      route === '/'
        ? path.join(DIST_DIR, 'index.html')
        : path.join(DIST_DIR, route, 'index.html')
    mkdirSync(path.dirname(outPath), { recursive: true })
    writeFileSync(outPath, `<!doctype html>\n${html}`)
  }

  console.log(`[prerender] done — ${results.length}/${ROUTES.length} routes prerendered into dist/`)
}

main()
