/* eslint-env node */
// scripts/validate-schema.mjs
//
// Offline structural check for the JSON-LD this app emits — a stand-in for
// Google's Rich Results Test (https://search.google.com/test/rich-results)
// until the site has a live public URL that tool can actually crawl.
//
// This does NOT render the app or fetch real data — it statically checks
// each schema "shape" this codebase is known to produce (see the seo
// components) against the required/recommended fields Google documents
// for each type. Run with: node scripts/validate-schema.mjs

const RULES = {
  Organization: {
    required: ['name', 'url'],
    recommended: ['logo', 'sameAs', 'telephone', 'email'],
  },
  LocalBusiness: {
    required: ['name', 'address'],
    recommended: ['telephone', 'image', 'priceRange', 'openingHours'],
  },
  WebSite: {
    required: ['name', 'url'],
    recommended: ['potentialAction'], // SearchAction — not implemented, sitelinks searchbox opt-in
  },
  WebPage: {
    required: ['name', 'url'],
    recommended: ['description', 'breadcrumb'],
  },
  BreadcrumbList: {
    required: ['itemListElement'],
    recommended: [],
  },
  Product: {
    required: ['name'],
    recommended: ['description', 'image', 'brand', 'offers'], // no offers = no price rich result, expected (B2B/enquiry model, not e-commerce)
  },
  Service: {
    required: ['name'],
    recommended: ['description', 'provider', 'areaServed'],
  },
  BlogPosting: {
    required: ['headline', 'datePublished'],
    recommended: ['dateModified', 'author', 'image', 'publisher'],
  },
  JobPosting: {
    required: ['title', 'description', 'datePosted', 'hiringOrganization', 'jobLocation'],
    recommended: ['validThrough', 'employmentType'],
  },
  FAQPage: {
    required: ['mainEntity'],
    recommended: [],
  },
}

// Actual field sets this codebase's seo components produce as of this
// audit — kept in sync manually since there's no live render step here.
const EMITTED_SCHEMAS = [
  { type: 'Organization', source: 'OrganizationSchema.jsx (no SITE.address)', fields: ['name', 'url', 'logo', 'email', 'telephone', 'sameAs'] },
  { type: 'LocalBusiness', source: 'OrganizationSchema.jsx (SITE.address set)', fields: ['name', 'url', 'logo', 'email', 'telephone', 'sameAs', 'address'] },
  { type: 'WebSite', source: 'WebsiteSchema.jsx', fields: ['name', 'url', 'inLanguage', 'publisher'] },
  { type: 'WebPage', source: 'Seo.jsx default fallback', fields: ['name', 'url', 'description'] },
  { type: 'BreadcrumbList', source: 'Seo.jsx (breadcrumbs prop)', fields: ['itemListElement'] },
  { type: 'Product', source: 'ProductPageTemplate.jsx', fields: ['name', 'description', 'image'] },
  { type: 'Service', source: 'SectorApplicationsTemplate.jsx', fields: ['name', 'description', 'provider', 'areaServed'] },
  { type: 'BlogPosting', source: 'BlogPostPage.jsx', fields: ['headline', 'description', 'datePublished', 'dateModified', 'image', 'author', 'publisher'] },
  { type: 'JobPosting', source: 'JobListingPage.jsx', fields: ['title', 'description', 'datePosted', 'hiringOrganization', 'jobLocation'] },
  { type: 'FAQPage', source: 'ContactPage.jsx', fields: ['mainEntity'] },
]

let hasError = false

for (const schema of EMITTED_SCHEMAS) {
  const rule = RULES[schema.type]
  if (!rule) {
    console.log(`? ${schema.type} — no validation rule defined, skipped`)
    continue
  }
  const missingRequired = rule.required.filter((f) => !schema.fields.includes(f))
  const missingRecommended = rule.recommended.filter((f) => !schema.fields.includes(f))

  if (missingRequired.length > 0) {
    hasError = true
    console.log(`✗ ${schema.type} (${schema.source}) — MISSING REQUIRED: ${missingRequired.join(', ')}`)
  } else {
    console.log(`✓ ${schema.type} (${schema.source}) — all required fields present`)
  }
  if (missingRecommended.length > 0) {
    console.log(`  ⚠ optional/recommended not set: ${missingRecommended.join(', ')}`)
  }
}

console.log('')
console.log(hasError ? 'FAILED — required fields missing, see ✗ above.' : 'PASSED — no required fields missing.')
console.log('Note: this is a structural check only. Once deployed, confirm with')
console.log('the real Rich Results Test: https://search.google.com/test/rich-results')

process.exit(hasError ? 1 : 0)
