// scripts/generate-seo-files.mjs
//
// Generates public/sitemap.xml and public/robots.txt from the actual route
// data (SITE, PRODUCTS, SECTORS in data/siteData.js) rather than a hand
// maintained list — so it can't silently drift out of sync as products or
// sectors are added/removed. Runs as the "prebuild" npm script, before
// `vite build`, so Vite copies the freshly generated files into dist/ along
// with everything else in public/.
//
// Blog posts and job listings are backend-driven, so they're fetched live
// from the API at build time (see fetchDynamicUrls below) rather than
// hardcoded — this runs on the same VPS as the backend as part of the
// deploy, so it talks to it directly over localhost rather than through the
// public domain/SSL. If the backend is slow or unreachable when this runs,
// the fetch is time-boxed and wrapped in try/catch: the build logs a clear
// warning and continues with just the static/product/sector URLs rather
// than failing the whole deploy over a sitemap.

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FRONTEND_DIR = path.join(__dirname, '..')
const PUBLIC_DIR = path.join(FRONTEND_DIR, 'public')

// ── Tiny .env loader ────────────────────────────────────────────────────
// This script runs under plain Node (no Vite env injection available), so
// SITEMAP_API_BASE_URL below needs to come from somewhere. Rather than add
// a `dotenv` dependency for one optional variable, parse frontend/.env by
// hand (a handful of lines) if it exists — doesn't overwrite anything
// already set in the actual shell environment (e.g. by a CI pipeline).
function loadDotEnv(file) {
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf-8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (!match) continue
    const [, key, rawValue = ''] = match
    if (process.env[key] !== undefined) continue // real env always wins
    process.env[key] = rawValue.replace(/^["']|["']$/g, '')
  }
}
loadDotEnv(path.join(FRONTEND_DIR, '.env'))

// siteData.js uses ESM `export const` — re-declared here rather than
// imported directly because this script runs under plain Node (no JSX/Vite
// transform available) and the source has no non-JS syntax, so a light
// require-free duplication keeps this dependency-free. If SITE/PRODUCTS/
// SECTORS change shape, update both this list and data/siteData.js together.
const SITE_URL = 'https://www.vayuronadvancedsystems.com' // ⚠ update to your real production domain

// Internal API base for this build-time fetch specifically — deliberately
// separate from VITE_API_BASE_URL (that one's baked into the browser
// bundle and typically a same-origin relative path like /api in
// production). This one only needs to work on the machine running the
// build, so localhost is both simpler and avoids a chicken-and-egg problem
// if DNS/SSL for the public domain aren't live yet during initial deploy.
const API_BASE = process.env.SITEMAP_API_BASE_URL || 'http://127.0.0.1:8000/api'
const FETCH_TIMEOUT_MS = 5000

const PRODUCT_PATHS = [
  '/products/uav-systems',
  '/products/mvtx',
  '/products/artificial-intelligence',
  '/products/advanced-engineering',
]

const SECTOR_PATHS = [
  '/sectors/defence-homeland-security',
  '/sectors/government-smart-infrastructure',
  '/sectors/energy-industrial-critical-infrastructure',
  '/sectors/agriculture-environmental-intelligence',
  '/sectors/mining-surveying-research',
]

const STATIC_PATHS = [
  { path: '/', priority: '1.0' },
  { path: '/products', priority: '0.9' },
  { path: '/sectors', priority: '0.9' },
  { path: '/technology', priority: '0.7' },
  { path: '/about', priority: '0.7' },
  { path: '/careers', priority: '0.6' },
  { path: '/contact', priority: '0.6' },
  { path: '/blog', priority: '0.6' },
]

// ── Dynamic URLs (blog posts, open job listings) ────────────────────────
async function fetchJson(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return await res.json()
  } finally {
    clearTimeout(timeout)
  }
}

// DRF's StandardResultsPagination defaults to 20/page but honors
// ?page_size up to 1000 — request everything in one page rather than
// following `next` links for what should always be a small collection.
async function fetchDynamicUrls() {
  const urls = []

  try {
    const data = await fetchJson(`${API_BASE}/blog/posts/?page_size=1000`)
    const posts = data?.results || data || []
    for (const post of posts) {
      if (!post.slug) continue
      urls.push({
        path: `/blog/${post.slug}`,
        priority: '0.6',
        lastmod: post.published_at || post.updated_at,
      })
    }
    console.log(`[generate-seo-files] fetched ${posts.length} blog post(s) for the sitemap.`)
  } catch (err) {
    console.warn(`[generate-seo-files] ⚠ couldn't fetch blog posts (${err.message}) — sitemap will omit /blog/* URLs this run.`)
  }

  try {
    // Mirrors the same ?status=open filter the public CareersPage itself
    // sends — closed listings shouldn't be indexed.
    const data = await fetchJson(`${API_BASE}/careers/listings/?status=open&page_size=1000`)
    const listings = data?.results || data || []
    for (const listing of listings) {
      if (!listing.slug) continue
      urls.push({
        path: `/careers/${listing.slug}`,
        priority: '0.5',
        lastmod: listing.updated_at,
      })
    }
    console.log(`[generate-seo-files] fetched ${listings.length} open job listing(s) for the sitemap.`)
  } catch (err) {
    console.warn(`[generate-seo-files] ⚠ couldn't fetch job listings (${err.message}) — sitemap will omit /careers/* URLs this run.`)
  }

  return urls
}

function buildSitemap(dynamicUrls) {
  const allUrls = [
    ...STATIC_PATHS,
    ...PRODUCT_PATHS.map((p) => ({ path: p, priority: '0.8' })),
    ...SECTOR_PATHS.map((p) => ({ path: p, priority: '0.7' })),
    ...dynamicUrls,
  ]

  const urlEntries = allUrls
    .map(({ path: p, priority, lastmod }) => {
      const lastmodTag = lastmod ? `<lastmod>${new Date(lastmod).toISOString().slice(0, 10)}</lastmod>` : ''
      return `  <url><loc>${SITE_URL}${p}</loc>${lastmodTag}<priority>${priority}</priority></url>`
    })
    .join('\n')

  return {
    xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`,
    count: allUrls.length,
  }
}

function buildRobots() {
  return `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /reset-password/
Disallow: /verify-email/

Sitemap: ${SITE_URL}/sitemap.xml
`
}

const dynamicUrls = await fetchDynamicUrls()
const { xml, count } = buildSitemap(dynamicUrls)

writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml)
writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), buildRobots())

console.log(`[generate-seo-files] wrote sitemap.xml (${count} URLs) and robots.txt to public/`)
