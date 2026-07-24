{/* SectorApplicationsTemplate.jsx — new 5-sector structure.
    Each sector page = Banner + Overview/Solution + one StackSection per
    application sub-point (Mission / Capabilities / Advantages / Impact)
    + CTA. Built entirely from existing components (StackSection, PageBanner,
    InfoCard, CardGrid, CTAButton) so the site's visual language, animation
    system, and routing are untouched — only sector content structure changes. */}

import { Link, useLocation } from 'react-router-dom'
import { PageBanner, CTAButton, InfoCard, CardGrid, StatCard } from '../../../components/ui'
import StackSection from '../../../components/sections/StackSection'
import Seo from '../../../components/seo/Seo'
import { PRODUCTS, SITE } from '../../../data/siteData'

// Background images cycled across application sections for visual variety —
// all pre-existing site assets, no new files introduced.
const BG_CYCLE = [
  '/images/RightDrone.webp',
  '/images/Green.webp',
  '/images/ProductPage2.webp',
  '/images/drone-bg.webp',
  '/images/Tech2.webp',
  '/images/Tech4.webp',
  '/images/Tech5.webp',
  '/images/technology-bg.webp',
]

export default function SectorApplicationsTemplate({
  title,
  subtitle,
  eyebrow,
  overview,
  solution,
  stats = [],
  applications = [], // each: { title, mission, capabilities: [], advantages, impact }
  crumbs = [],
  backgroundImage,
  backgroundVideoMp4,
  backgroundVideoWebm,
}) {
  const hasStats = stats.length > 0
  const location = useLocation()

  // Minimal valid Service schema — sector pages describe an operational
  // domain Vayuron serves, not a product with its own SKU, so Service
  // (not Product) is the correct schema.org type here. Mirrors the same
  // "only what the template actually has" approach as ProductPageTemplate's
  // productSchema — no invented `areaServed`/`offers` fields.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: subtitle || overview,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    ...(backgroundImage && { image: `${SITE.url}${backgroundImage}` }),
  }

  let idx = 0
  const bannerIndex = idx++
  const overviewIndex = idx++
  const appIndexes = applications.map(() => idx++)
  const ctaIndex = idx++

  return (
    <>
      <Seo
        title={title}
        description={subtitle || overview}
        path={location.pathname}
        image={backgroundImage}
        jsonLd={serviceSchema}
        breadcrumbs={crumbs}
      />

      <main>
        {/* ── Banner ── */}
        <StackSection index={bannerIndex}>
          <PageBanner
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            crumbs={crumbs}
            backgroundImage={backgroundImage}
            backgroundVideoMp4={backgroundVideoMp4}
            backgroundVideoWebm={backgroundVideoWebm}
          />
        </StackSection>

        {/* ── Overview + Solution ── */}
        <StackSection index={overviewIndex}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/RightDrone.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-black/80" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-16 sm:py-20 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
                <div>
                  <p className="font-display text-white text-xl sm:text-2xl md:text-[1.9rem] font-medium leading-[1.45] tracking-[-0.02em] max-w-3xl">
                    Sector Overview
                  </p>
                  <div className="w-12 h-[2px] bg-cyan mb-6" />
                  <p className="font-display text-white/100 text-lg sm:text-xl md:text-2xl leading-relaxed font-normal">
                    {overview}
                  </p>

                  {hasStats && (
                    <div className="mt-10 grid grid-cols-3 gap-6">
                      {stats.map((s, i) => (
                        <StatCard key={i} value={s.value} suffix={s.suffix} label={s.label} />
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-cyan/40 to-transparent" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                  </div>
                </div>

                {solution && (
                  <div className="group relative rounded-lg md:rounded-xl border border-[rgba(0,212,255,0.12)] md:border-[rgba(0,212,255,0.22)] bg-black/20 md:bg-black/50 backdrop-blur-lg md:backdrop-blur-xl p-5 sm:p-6 md:p-9 shadow-none md:shadow-[0_0_60px_rgba(0,212,255,0.07)] transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 md:hover:translate-y-0 md:hover:border-[rgba(0,212,255,0.22)] md:hover:bg-black/50">
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg md:rounded-t-xl bg-gradient-to-r from-cyan/60 via-cyan to-cyan/60" />
                    <p className="font-mono text-xs tracking-[0.28em] uppercase text-cyan mb-4">
                      Vayuron Solution
                    </p>
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
                      How We Help
                    </h2>
                    <p className="text-white/100 text-sm sm:text-base md:text-lg leading-relaxed">
                      {solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </StackSection>

        {/* ── One StackSection per application sub-point ── */}
        {applications.map((app, i) => {
          const bg = BG_CYCLE[i % BG_CYCLE.length]
          return (
            <StackSection key={i} index={appIndexes[i]}>
              <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('${bg}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/85" />

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-10 sm:py-16 md:py-24">
                  {/* Section header */}
                  <div className="flex items-start gap-4 mb-3">
                    <span className="font-mono text-cyan/70 text-sm md:text-base pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>

                      <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">
                        {app.title}
                      </h2>
                    </div>
                  </div>
                  <div className="w-16 h-[2px] bg-cyan mb-8 ml-9" />

                  {/* Mission / Capabilities / Advantages / Impact — 4 cards */}
                  <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <InfoCard
                      title="Mission"
                      description={app.mission}
                      className="p-5"
                    />
                    <InfoCard
                      title="Drone Capabilities Used"
                      description={app.capabilities || []}
                      className="p-5"
                    />
                    <InfoCard
                      title="Operational Advantages"
                      description={app.advantages}
                      className="p-5"
                    />
                    <InfoCard
                      title="Real-World Impact"
                      description={app.impact}
                      className="p-5"
                    />
                  </CardGrid>
                </div>
              </section>
            </StackSection>
          )
        })}

        {/* ── CTA ── */}
        <StackSection index={ctaIndex} dim={false}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/DroneC.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/80" />

            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Deploy in {title}?
              </h2>
              <p className="text-white/100 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                Our sector specialists can design a tailored autonomous systems solution for your operational requirements.
              </p>
              <CTAButton to="/contact" variant="primary">
                Start a Conversation
              </CTAButton>

              {/* Internal link: sector → relevant products, per SEO Phase 2's
                  internal-linking pass. Links to all 4 (rather than a curated
                  per-sector subset) since there's no existing data mapping
                  specific products to specific sectors — adding one would be
                  inventing a relationship not backed by real data. */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                {PRODUCTS.map((product) => (
                  <Link
                    key={product.id}
                    to={product.path}
                    className="text-[var(--muted)] hover:text-cyan hover:underline transition-colors"
                  >
                    {product.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
