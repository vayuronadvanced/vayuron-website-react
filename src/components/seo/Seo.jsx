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
}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.name
  const canonicalUrl = `${SITE.url}${path}`
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE.url}${image}`) : undefined
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

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
