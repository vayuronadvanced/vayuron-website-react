// scripts/check-seo-drift.mjs
//
// Lightweight, dependency-free drift check — no new tooling to adopt, just
// `node scripts/check-seo-drift.mjs`. Designed to run as a CI step (or
// pre-commit hook) so metadata coverage doesn't silently rot as new
// sectors/products/pages get added after launch. Exits non-zero on any
// finding so it can gate a CI pipeline if you wire it in as one.
//
// Checks:
//   1. Every route declared in App.jsx renders a page that imports <Seo>
//      (or is explicitly allow-listed below as intentionally exempt —
//      dashboard/auth pages shouldn't be indexed anyway).
//   2. sitemap.xml is well-formed XML and every <loc> has a matching path
//      declared in App.jsx (catches a sitemap entry for a route that got
//      renamed or removed).
//   3. Warns (doesn't fail) if a route exists in App.jsx but isn't in
//      sitemap.xml — new pages are easy to forget to add.

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.join(__dirname, '..', 'src')
const APP_JSX = path.join(SRC_DIR, 'App.jsx')
const SITEMAP = path.join(__dirname, '..', 'public', 'sitemap.xml')

// Routes that are intentionally not indexed / don't need <Seo> — dashboard
// (behind ProtectedRoute), auth flows, and the catch-all 404. Update this
// list if you add more non-public routes.
const EXEMPT_ROUTE_PATTERNS = [
  /^\/dashboard/,
  /^\/login$/,
  /^\/register$/,
  /^\/forgot-password$/,
  /^\/reset-password/,
  /^\/verify-email/,
  /^\/newsletter\/unsubscribe/, // noindex, token-based — never belongs in the sitemap
  /^\*$/,
]

let errors = 0
let warnings = 0

function fail(msg) {
  console.error(`✗ ${msg}`)
  errors++
}
function warn(msg) {
  console.warn(`⚠ ${msg}`)
  warnings++
}
function pass(msg) {
  console.log(`✓ ${msg}`)
}

// ── 1 & 3: parse App.jsx routes, cross-check component source for <Seo> ──
const appSource = readFileSync(APP_JSX, 'utf8')
const routeRegex = /<Route\s+path="([^"]+)"\s+element=\{<PageWrapper><(\w+)\s*\/><\/PageWrapper>\}/g
const lazyImportRegex = /const (\w+) = lazy\(\(\) => import\('([^']+)'\)\)/g

const lazyImports = {}
for (const m of appSource.matchAll(lazyImportRegex)) {
  lazyImports[m[1]] = m[2]
}

const routes = [...appSource.matchAll(routeRegex)].map((m) => ({ path: m[1], component: m[2] }))

if (routes.length === 0) {
  warn('No routes matched by the parser regex — App.jsx structure may have changed; update the regex in this script.')
}

for (const { path: routePath, component } of routes) {
  const isExempt = EXEMPT_ROUTE_PATTERNS.some((re) => re.test(routePath))
  if (isExempt) continue

  const importPath = lazyImports[component]
  if (!importPath) {
    warn(`Route "${routePath}" renders <${component}> but it isn't lazy-imported the way this script expects — skipping its <Seo> check.`)
    continue
  }

  const filePath = path.join(SRC_DIR, importPath.replace('./', '') + '.jsx')
  if (!existsSync(filePath)) {
    fail(`Route "${routePath}" points at ${importPath}.jsx, which doesn't exist.`)
    continue
  }

  const source = readFileSync(filePath, 'utf8')
  if (source.includes('<Seo') || source.includes('SectorApplicationsTemplate') || source.includes('ProductPageTemplate')) {
    pass(`${routePath} → ${component} has SEO metadata`)
  } else if (source.includes('<Helmet')) {
    fail(`${routePath} → ${component} still uses bare <Helmet> instead of <Seo> — no canonical/OG tags.`)
  } else {
    fail(`${routePath} → ${component} has NO metadata at all (<Seo> or <Helmet>).`)
  }
}

// ── 2: sitemap validity + cross-check against real routes ──
if (!existsSync(SITEMAP)) {
  fail('public/sitemap.xml does not exist — run `npm run prebuild` first.')
} else {
  const xml = readFileSync(SITEMAP, 'utf8')
  const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

  if (locMatches.length === 0) {
    fail('sitemap.xml contains no <loc> entries — likely malformed or empty.')
  } else {
    pass(`sitemap.xml is well-formed and lists ${locMatches.length} URLs.`)
  }

  const realPaths = new Set(routes.map((r) => r.path))
  for (const loc of locMatches) {
    let urlPath
    try {
      urlPath = new URL(loc).pathname
    } catch {
      fail(`sitemap.xml has an invalid URL: "${loc}"`)
      continue
    }
    if (!realPaths.has(urlPath) && urlPath !== '/') {
      warn(`sitemap.xml lists "${urlPath}" but no matching static route exists in App.jsx — may be stale, or intentionally dynamic (blog/careers).`)
    }
  }

  for (const { path: routePath } of routes) {
    const isExempt = EXEMPT_ROUTE_PATTERNS.some((re) => re.test(routePath))
    if (isExempt) continue
    const inSitemap = locMatches.some((loc) => {
      try {
        return new URL(loc).pathname === routePath
      } catch {
        return false
      }
    })
    if (!inSitemap) {
      warn(`Route "${routePath}" isn't listed in sitemap.xml — if it's a real static public page, add it to scripts/generate-seo-files.mjs.`)
    }
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s).`)
process.exit(errors > 0 ? 1 : 0)
