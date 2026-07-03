import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton, CyanDivider, InfoCard } from '../../components/ui'
import StackSection from '../../components/sections/StackSection'

export default function ProductPageTemplate({
  title,
  subtitle,
  eyebrow,
  description,
  backgroundImage,
  heroVideo,        // mp4 src (required to show the video hero section at all)
  heroVideoWebm,     // optional — additional <source> for smaller file size
  heroPoster,        // specs = [], optional — poster frame + reduced-motion fallback image
  contentBackgroundImage,
  features = [],     // each: { icon, title, description, bullets? } — bullets optional but should be equal-length across a page's features for card consistency
  relatedProducts = [],
  nextProduct = null,
  crumbs = [],
}) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const hasHeroVideo = Boolean(heroVideo)

  // Sections stack in DOM order with increasing index. heroVideo is
  // optional, so indices after it shift depending on whether it renders.
  const bannerIndex = 0
  const heroIndex = 1
  const specsIndex = hasHeroVideo ? 2 : 1
  const ctaIndex = hasHeroVideo ? 3 : 2

  return (
    <>
      <Helmet>
        <title>{title} — Vayuron Advanced Systems</title>
        <meta name="description" content={subtitle} />
      </Helmet>

      {/* Stacked scroll transitions — same pattern as HomePage/TechnologyPage/
          AboutPage: each StackSection pins (position: sticky) while the
          next one scrolls up to cover it. */}
      <main>
        {/* ═══════════════════════════════════════
            PAGE BANNER
        ═══════════════════════════════════════ */}
        <StackSection index={bannerIndex}>
          <PageBanner
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            crumbs={crumbs}
            backgroundImage={backgroundImage}
          />
        </StackSection>

        {/* ═══════════════════════════════════════
            VIDEO HERO
        ═══════════════════════════════════════ */}
        {hasHeroVideo && (
          <StackSection index={heroIndex}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              {prefersReducedMotion ? (
                <img
                  src={heroPoster || backgroundImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={heroPoster || backgroundImage}
                  aria-hidden="true"
                >
                  {heroVideoWebm && <source src={heroVideoWebm} type="video/webm" />}
                  <source src={heroVideo} type="video/mp4" />
                </video>
              )}

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 flex items-center">
                <div className="max-w-2xl border-l-2 border-cyan pl-6">
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-2">
                    Product Overview
                  </p>
                  <h2 className="font-sans text-white text-3xl md:text-4xl font-bold mb-2 leading-tight">
                    {title} in Action
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Autonomous aerial platforms designed for real-world mission environments.
                  </p>
                </div>
              </div>
            </section>
          </StackSection>
        )}

        {/* ═══════════════════════════════════════
            SPECS + CAPABILITIES
        ═══════════════════════════════════════ */}
        <StackSection index={specsIndex}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            {contentBackgroundImage && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${contentBackgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              {/* ── KEY SPECIFICATIONS ── 
              {specs.length > 0 && (
                <div className="mb-24">
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-2">Technical Data</p>
                  <h2 className="font-sans text-2xl font-bold text-white mb-8 uppercase tracking-wide">
                    Key Specifications
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {specs.map((spec, i) => (
                      <SpecCard key={i} label={spec.label} value={spec.value} />
                    ))}
                  </div>
                </div>
              )} 
               */}
               

              <div className="mb-24 opacity-30">
                <CyanDivider />
              </div>

              {/* ── CAPABILITIES  */}
              {features.length > 0 && (
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-2">What It Can Do</p>
                  <h2 className="font-sans text-2xl font-bold text-white mb-8 uppercase tracking-wide">
                    Capabilities
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                      <InfoCard
                        key={i}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        bullets={feature.bullets || []}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            CTA
        ═══════════════════════════════════════ */}
        <StackSection index={ctaIndex} dim={false}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t border-[rgba(0,212,255,0.1)] bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/DroneC.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Interested in {title}?
              </h2>

              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Speak with our engineering team about your operational requirements.
              </p>

              <div className="flex justify-center gap-5 flex-wrap mt-10">
                <CTAButton to="/contact" variant="primary">
                  Request a Briefing
                </CTAButton>

                {nextProduct && (
                  <CTAButton to={nextProduct.path} variant="secondary">
                    Next: {nextProduct.label} →
                  </CTAButton>
                )}
              </div>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
