{/*ProductPageTemplate.jsx*/ }

import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton, InfoCard, SpecCard, CardGrid } from '../../../components/ui'
import StackSection from '../../../components/sections/StackSection'

export default function ProductPageTemplate({
  title,
  subtitle,
  eyebrow,
  description,
  backgroundImage,
  heroVideo,        // mp4 src (required to show the video hero section at all)
  heroVideoWebm,     // optional — additional <source> for smaller file size
  heroPoster,        // optional — poster frame + reduced-motion fallback image
  specsBackgroundImage,        // distinct background for the Specs section
  specsEyebrow = 'Technical Data',
  specsTitle = 'Key Specifications',
  specsDescription,            // optional prose paragraph shown above the spec grid
  specsMoreDetailsHref,         // optional — e.g. a PDF in public/documents; renders a "More Details" button
  specsMoreDetailsLabel = 'More Details',
  secondaryBackgroundImage,    // distinct background for the optional second spec-showcase section
  secondaryEyebrow = 'Technical Data',
  secondaryTitle,
  secondaryDescription,
  secondarySpecs = [],         // same shape as `specs` — renders as its own StackSection, same design as the Specs section
  secondaryMoreDetailsHref,     // optional — e.g. a PDF in public/documents; renders a "More Details" button
  secondaryMoreDetailsLabel = 'More Details',
  capabilitiesBackgroundImage, // distinct background for the Capabilities section
  specs = [],
  features = [],     // each: { icon, title, description, bullets? } — bullets optional but should be equal-length across a page's features for card consistency
  cardSections = [],  // arbitrary repeatable InfoCard-grid sections, each rendered as its own StackSection:
  // { eyebrow, title, backgroundImage, columns, moreDetailsHref, moreDetailsLabel,
  //   cards: [{ icon, title, description, bullets? }] }
  nextProduct = null,
  crumbs = [],
}) {
  const hasSpecs = specs.length > 0
  const hasSecondarySpecs = secondarySpecs.length > 0
  const hasFeatures = features.length > 0

  // Sections stack in DOM order with increasing index. heroVideo/specs/
  // secondarySpecs/features are all independently optional, so indices
  // are computed in order rather than hardcoded — any combination of
  // props stays correct.
  let idx = 0
  const bannerIndex = idx++
  const specsIndex = hasSpecs ? idx++ : null
  const secondaryIndex = hasSecondarySpecs ? idx++ : null
  const capabilitiesIndex = hasFeatures ? idx++ : null
  const cardSectionIndices = cardSections.map(() => idx++)
  const ctaIndex = idx++ // always renders, last

  return (
    <>
      <Helmet>
        <title>{title} — Vayuron Advanced Systems</title>
        <meta name="description" content={description || subtitle} />
      </Helmet>

      {/* Stacked scroll transitions — same pattern as every other page:
          each StackSection pins (position: sticky) while the next one
          scrolls up to cover it. */}
      <main>
        {/* ═══════════════════════════════════════
            PAGE BANNER (video replaces image when heroVideo is given —
            same title/subtitle/crumbs text as before, just a video
            background now. The old standalone "VIDEO HERO" section has
            been removed entirely; its video now plays here instead.)
        ═══════════════════════════════════════ */}
        <StackSection index={bannerIndex}>
          <PageBanner
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            crumbs={crumbs}
            backgroundImage={heroPoster || backgroundImage}
            backgroundVideoMp4={heroVideo}
            backgroundVideoWebm={heroVideoWebm}
          />
        </StackSection>

        {/* ═══════════════════════════════════════
            KEY SPECIFICATIONS
        ═══════════════════════════════════════ */}
        {hasSpecs && (
          <StackSection index={specsIndex}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              {specsBackgroundImage && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${specsBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
              {/* Cinematic gradient — darker at the edges, clearer in the
                  centre, instead of a flat overlay. */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/60 to-black/30" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
                  {/* Left — title & description */}
                  <div className="border-l-2 border-cyan pl-6">
                    <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-3">
                      {specsEyebrow}
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {specsTitle}
                    </h2>

                    {specsDescription && (
                      <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
                        {specsDescription}
                      </p>
                    )}

                    {specsMoreDetailsHref && (
                      <CTAButton href={specsMoreDetailsHref} variant="primary">
                        {specsMoreDetailsLabel}
                      </CTAButton>
                    )}
                  </div>

                  {/* Right — spec grid in a glass panel */}
                  <div className="rounded-xl border border-[rgba(0,212,255,0.18)] bg-black/40 backdrop-blur-lg p-6 md:p-8 shadow-[0_0_40px_rgba(0,212,255,0.06)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {specs.map((spec, i) => (
                        <SpecCard key={i} label={spec.label} value={spec.value} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </StackSection>
        )}

        {/* ═══════════════════════════════════════
            SECONDARY SPEC SHOWCASE — same design language as the Specs
            section above (glass panel + accent line), mirrored layout for
            visual rhythm when the two sit back-to-back in the stack.
        ═══════════════════════════════════════ */}
        {hasSecondarySpecs && (
          <StackSection index={secondaryIndex}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              {secondaryBackgroundImage && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${secondaryBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-black/60 to-black/30" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
                  {/* Left — spec grid in a glass panel (mirrored order) */}
                  <div className="order-2 lg:order-1 rounded-xl border border-[rgba(0,212,255,0.18)] bg-black/40 backdrop-blur-lg p-6 md:p-8 shadow-[0_0_40px_rgba(0,212,255,0.06)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {secondarySpecs.map((spec, i) => (
                        <SpecCard key={i} label={spec.label} value={spec.value} />
                      ))}
                    </div>
                  </div>

                  {/* Right — title & description */}
                  <div className="order-1 lg:order-2 border-l-2 border-cyan pl-6">
                    <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-3">
                      {secondaryEyebrow}
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {secondaryTitle}
                    </h2>

                    {secondaryDescription && (
                      <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
                        {secondaryDescription}
                      </p>
                    )}

                    {secondaryMoreDetailsHref && (
                      <CTAButton href={secondaryMoreDetailsHref} variant="primary">
                        {secondaryMoreDetailsLabel}
                      </CTAButton>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </StackSection>
        )}

        {/* ═══════════════════════════════════════
            CAPABILITIES (standardized InfoCard — same card used site-wide:
            same size/shape/hover/heading font. Give every feature on a
            page the same number of `bullets` entries so cards line up.
            Uses CardGrid so hover here matches the homepage exactly:
            lift + scale + shadow on the hovered card, blur + scale-down
            on its siblings.)
        ═══════════════════════════════════════ */}
        {hasFeatures && (
          <StackSection index={capabilitiesIndex}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              {capabilitiesBackgroundImage && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${capabilitiesBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
              <div className="absolute inset-0 pointer-events-none bg-black/40" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-2">What It Can Do</p>
                <h2 className="font-sans text-2xl font-bold text-white mb-8 uppercase tracking-wide">
                  Capabilities
                </h2>

                <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, i) => (
                    <InfoCard
                      key={i}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      bullets={feature.bullets || []}
                    />
                  ))}
                </CardGrid>
              </div>
            </section>
          </StackSection>
        )}

        {/* ═══════════════════════════════════════
            CUSTOM CARD SECTIONS (arbitrary count — e.g. Core Capabilities,
            Engineering Services, Technology Expertise). Same InfoCard used
            everywhere else on the site, same heading treatment as the
            spec-showcase sections above for visual consistency. Uses
            CardGrid so hover here matches the homepage exactly.
        ═══════════════════════════════════════ */}
        {cardSections.map((section, sIdx) => (
          <StackSection key={sIdx} index={cardSectionIndices[sIdx]}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              {section.backgroundImage && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${section.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/70 to-black/40" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
                <div className="border-l-2 border-cyan pl-6 mb-10">
                  {section.eyebrow && (
                    <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-3">
                      {section.eyebrow}
                    </p>
                  )}
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                    {section.title}
                  </h2>
                </div>

                <CardGrid
                  gridClassName={`grid grid-cols-1 md:grid-cols-2 gap-6 ${(section.columns || 3) >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
                    }`}
                >
                  {(section.cards || []).map((card, cIdx) => (
                    <InfoCard
                      key={cIdx}
                      icon={card.icon}
                      title={card.title}
                      description={card.description}
                      bullets={card.bullets || []}
                    />
                  ))}
                </CardGrid>

                {section.moreDetailsHref && (
                  <div className="mt-10">
                    <CTAButton href={section.moreDetailsHref} variant="primary">
                      {section.moreDetailsLabel || 'More Details'}
                    </CTAButton>
                  </div>
                )}
              </div>
            </section>
          </StackSection>
        ))}

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
