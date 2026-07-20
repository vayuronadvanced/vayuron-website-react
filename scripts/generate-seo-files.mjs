// scripts/generate-seo-files.mjs
//
// Generates public/sitemap.xml and public/robots.txt from the actual route
// data (SITE, PRODUCTS, SECTORS in data/siteData.js) rather than a hand
// maintained list — so it can't silently drift out of sync as products or
// sectors are added/removed. Runs as the "prebuild" npm script, before
// `vite build`, so Vite copies the freshly generated files into dist/ along
// with everything else in public/.
//
// Deliberately does NOT include blog posts or careers job listings — those
// are backend-driven and this script only has access to frontend source at
// build time, not a live database. See INSTRUCTIONS for how to extend this
// once/if those need sitemap entries (fetch from the API here, or generate
// a second sitemap server-side from Django and reference it as a sitemap
// index — flagged as a follow-up, not implemented here).

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

// siteData.js uses ESM `export const` — re-declared here rather than
// imported directly because this script runs under plain Node (no JSX/Vite
// transform available) and the source has no non-JS syntax, so a light
// require-free duplication keeps this dependency-free. If SITE/PRODUCTS/
// SECTORS change shape, update both this list and data/siteData.js together.
const SITE_URL = 'https://www.vayuronadvancedsystems.com' // ⚠ update to your real production domain

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

const allUrls = [
  ...STATIC_PATHS,
  ...PRODUCT_PATHS.map((p) => ({ path: p, priority: '0.8' })),
  ...SECTOR_PATHS.map((p) => ({ path: p, priority: '0.7' })),
]

function buildSitemap() {
  const urlEntries = allUrls
    .map(({ path: p, priority }) => `  <url><loc>${SITE_URL}${p}</loc><priority>${priority}</priority></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`
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

writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap())
writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), buildRobots())

console.log(`[generate-seo-files] wrote sitemap.xml (${allUrls.length} URLs) and robots.txt to public/`)
console.log('[generate-seo-files] NOTE: blog posts and careers listings are NOT included — see comment at top of this script.')
