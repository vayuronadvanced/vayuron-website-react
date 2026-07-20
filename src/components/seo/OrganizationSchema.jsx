{/*OrganizationSchema.jsx*/ }

// Sitewide Organization JSON-LD, rendered once (in App.jsx) so it's present
// on every route. Pulls every value from SITE (data/siteData.js) — no
// invented fields. Fields Google's Organization schema commonly expects but
// that aren't available anywhere in the codebase (logo as an absolute URL
// asset, a founding date, a registered legal name distinct from the trading
// name) are left out rather than guessed; add them to SITE and this
// component will pick them up automatically.

import { Helmet } from 'react-helmet-async'
import { SITE } from '../../data/siteData'

export default function OrganizationSchema() {
  const sameAs = [SITE.linkedin, SITE.instagram, SITE.x].filter(Boolean)

  // Once SITE.address is filled in (see the comment in siteData.js), this
  // automatically upgrades from a bare Organization to a LocalBusiness with
  // full PostalAddress markup — no further code change needed.
  const hasAddress = Boolean(SITE.address?.streetAddress && SITE.address?.addressLocality)

  const schema = {
    '@context': 'https://schema.org',
    '@type': hasAddress ? 'LocalBusiness' : 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    ...(sameAs.length > 0 && { sameAs }),
    ...(hasAddress && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.streetAddress,
        addressLocality: SITE.address.addressLocality,
        addressRegion: SITE.address.addressRegion,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.addressCountry,
      },
    }),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
