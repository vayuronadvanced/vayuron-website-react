{/*Seo.jsx*/ }

// Centralizes title, meta description, canonical URL, and Open Graph tags
// so every page sets these the same way instead of hand-rolling <Helmet>
// blocks with inconsistent fields. Canonical/OG were previously missing
// entirely — pages only had <title> and <meta name="description">.
//
// Usage:
//   <Seo title="UAV Systems" description="..." path="/products/uav-systems" />
//   <Seo title="..." description="..." path="..." image="/OpenGraph1.png" type="article" />

import { Helmet } from 'react-helmet-async'
import { SITE } from '../../data/siteData'

export default function Seo({
  title,
  description,
  path = '/',
  image,          // absolute or root-relative path to a social preview image
  type = 'website', // 'website' | 'article' for blog posts
  noindex = false,
  jsonLd,          // optional object or array of objects to emit as JSON-LD
}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.name
  const canonicalUrl = `${SITE.url}${path}`
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE.url}${image}`) : undefined
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

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
