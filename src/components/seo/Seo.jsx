{/*Seo.jsx*/ }

// Centralizes title, meta description, canonical URL, and Open Graph tags
// so every page sets these the same way instead of hand-rolling <Helmet>
// blocks with inconsistent fields. Canonical/OG were previously missing
// entirely — pages only had <title> and <meta name="description">.
//
// Usage:
//   <Seo title="UAV Systems" description="..." path="/products/uav-systems" />
//   <Seo title="..." description="..." path="..." image="/OpenGraph1.png" type="article" />
//   <Seo title="..." description="..." path="..." breadcrumbs={[{ label: 'Products', path: '/products' }, { label: 'UAV Systems' }]} />
//
// `breadcrumbs` takes the exact same [{ label, path? }] shape already passed
// to the visual <Breadcrumb>/<PageBanner crumbs={...}> components (the last
// entry — the current page — conventionally omits `path`). When given, a
// BreadcrumbList JSON-LD block is emitted automatically, with "Home" always
// prepended as position 1 to match what <Breadcrumb> renders on screen — so
// the structured data always mirrors the visible trail with no duplicated
// data entry.

import { Helmet } from 'react-helmet-async'
import { SITE } from '../../data/siteData'

// Google Search Console HTML-tag verification. Read once per module load,
// same as the other integrations' env vars. Rendered (via Seo, below) on
// every route so it's present in the prerendered HTML output too — Search
// Console only needs to see it once, but it's simplest to emit it
// everywhere rather than special-case one page. No-ops (renders nothing)
// until VITE_GSC_VERIFICATION is set — get the value from Search Console →
// Settings → Ownership verification → HTML tag.
const GSC_VERIFICATION = import.meta.env.VITE_GSC_VERIFICATION

export default function Seo({
  title,
  description,
  path = '/',
  image,          // absolute or root-relative path to a social preview image
  type = 'website', // 'website' | 'article' for blog posts
  noindex = false,
  jsonLd,          // optional object or array of objects to emit as JSON-LD
  breadcrumbs,     // optional [{ label, path? }] — auto-emits BreadcrumbList JSON-LD
  publishedTime,   // article only — ISO date string, emits og:article:published_time
  modifiedTime,    // article only — ISO date string, emits og:article:modified_time
  author,          // article only — plain author name string, emits og:article:author
}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.name
  const canonicalUrl = `${SITE.url}${path}`
  // Pages that don't pass an explicit `image` (Home, Sectors, Products,
  // Careers, Contact, Blog index) previously got NO og:image/twitter:image
  // at all, which means social shares showed no preview thumbnail. Falls
  // back to a real, already-in-use site asset rather than leaving it blank.
  const DEFAULT_OG_IMAGE = '/images/IndiTechHome.webp'
  const resolvedImage = image || DEFAULT_OG_IMAGE
  const ogImage = resolvedImage.startsWith('http') ? resolvedImage : `${SITE.url}${resolvedImage}`
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  // Pages that pass their own jsonLd (Product, Service, BlogPosting, ...)
  // already have a specific, more useful schema type — this generic
  // WebPage fallback only fires when nothing else was provided, so plain
  // content pages (About, Technology, Contact, Careers, the /products and
  // /sectors index pages) still get baseline WebPage structured data
  // instead of none at all.
  if (jsonLdList.length === 0 && title && !noindex) {
    jsonLdList.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: fullTitle,
      ...(description && { description }),
      url: canonicalUrl,
    })
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdList.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        ...breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: crumb.label,
          // Final crumb (current page) has no `path` in the existing
          // crumbs data — schema.org allows omitting `item` on the last
          // ListItem since it represents the page the data is already on.
          ...(crumb.path && { item: `${SITE.url}${crumb.path}` }),
        })),
      ],
    })
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {GSC_VERIFICATION && (
        <meta name="google-site-verification" content={GSC_VERIFICATION} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLdList.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
