{/* SectorPageTemplate.jsx - PHASE 3 UPDATE - applies to all 8 sector detail pages */ }

import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton, InfoCard, CardGrid } from '../../../components/ui'
// import { StatCard } from '../../../components/ui' // paired with the disabled Stats section below — uncomment together
import StackSection from '../../../components/sections/StackSection'

export default function SectorPageTemplate({
  title,
  subtitle,
  eyebrow,
  overview,
  // eslint-disable-next-line no-unused-vars -- reserved prop, paired with the disabled Stats section below
  stats = [],
  challenges = [],  // each: { title, description, bullets? }
  solution,
  technologies = [], // each: { icon, label, description, path, bullets? }
  crumbs = [],
  backgroundImage,      // poster / reduced-motion fallback for the banner video
  backgroundVideoMp4,    // optional — enables the video hero on this sector's banner
  backgroundVideoWebm,   // optional
}) {
  // const hasStats = stats.length > 0 // paired with the disabled Stats section below — uncomment together
  const hasChallenges = challenges.length > 0
  const hasTechnologies = technologies.length > 0

  // Sections stack in DOM order with increasing index. Banner, Stats,
  // Challenges, and Technologies are all optional, so indices after each
  // one shift depending on what actually renders — compute them in order
  // rather than hardcoding, so any combination of props stays correct.
  let idx = 0
  const bannerIndex = idx++
  // const statsIndex = hasStats ? idx++ : null // paired with the disabled Stats section below — uncomment together
  const overviewIndex = idx++ // always renders
  const challengesIndex = hasChallenges ? idx++ : null
  const technologiesIndex = hasTechnologies ? idx++ : null
  const ctaIndex = idx++ // always renders, last

  return (
    <>
      <Helmet>
        <title>{title} — Vayuron Advanced Systems</title>
        <meta name="description" content={subtitle} />
      </Helmet>

      {/* Stacked scroll transitions — same pattern as every other page:
          each StackSection pins (position: sticky) while the next one
          scrolls up to cover it. */}
      <main>
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

        {/* Overview — editorial layout replacing the two plain InfoCards */}
        <StackSection index={overviewIndex}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/RightDrone.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {/* Cinematic gradient — dark at top, lighter in the centre,
                dark again at bottom — gives depth behind the content */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-black/80" />

            {/* Top cyan glow line : <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40" />*/}


            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-16 sm:py-20 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">

                {/* Left — large editorial overview text */}
                <div>
                  <p className="font-display text-white text-xl sm:text-2xl md:text-[1.9rem] font-medium leading-[1.45] tracking-[-0.02em] max-w-3xl">
                    Sector Overview
                  </p>

                  {/* Decorative cyan rule */}
                  <div className="w-12 h-[2px] bg-cyan mb-6" />

                  <p className="font-display text-white/100 text-lg sm:text-xl md:text-2xl leading-relaxed font-normal">
                    {overview}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-cyan/40 to-transparent" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                  </div>
                </div>

                {/* Right — Vayuron Solution glass panel */}
                {solution && (
                  <div className="relative rounded-xl border border-[rgba(0,212,255,0.22)] bg-black/50 backdrop-blur-xl p-7 md:p-9 shadow-[0_0_60px_rgba(0,212,255,0.07)]">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-cyan/60 via-cyan to-cyan/60" />

                    <p className="font-mono text-xs tracking-[0.28em] uppercase text-cyan mb-4">
                      Vayuron Solution
                    </p>

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
                      How We Help
                    </h3>

                    <p className="text-white/100 text-base md:text-lg leading-relaxed">
                      {solution}
                    </p>

                  </div>
                )}

              </div>
            </div>
          </section>
        </StackSection>

        {/* Challenges */}
        {hasChallenges && (
          <StackSection index={challengesIndex}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/Green.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-10 sm:py-16 md:py-24">
                <h2 className="font-display text-2xl font-bold text-white mb-8">
                  Sector Challenges
                </h2>

                {/* UPDATED: Wrapped in CardGrid for premium hover effects (16px lift) */}
                <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {challenges.map((c, i) => (
                    <InfoCard
                      key={i}
                      title={c.title}
                      description={c.description}
                      bullets={c.bullets || []}
                      className="p-5"
                    />
                  ))}
                </CardGrid>
              </div>
            </section>
          </StackSection>
        )}

        {/* Technology Cards */}
        {hasTechnologies && (
          <StackSection index={technologiesIndex}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/ProductPage2.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-10 sm:py-16 md:py-24">
                <h2 className="font-display text-2xl font-bold text-white mb-8">
                  Technologies Deployed
                </h2>

                {/* UPDATED: Wrapped in CardGrid for premium hover effects (16px lift) */}
                <CardGrid>
                  {technologies.map((tech, i) => (
                    <InfoCard
                      key={i}
                      to={tech.path || '/products'}
                      icon={tech.icon}
                      title={tech.label}
                      description={tech.description}
                      bullets={tech.bullets || []}
                    />
                  ))}
                </CardGrid>
              </div>
            </section>
          </StackSection>
        )}

        {/* CTA */}
        <StackSection index={ctaIndex} dim={false}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/DroneC.png')",
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
                Our sector specialists can design a tailored solution for your operational requirements.
              </p>
              <CTAButton to="/contact" variant="primary">
                Start a Conversation
              </CTAButton>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
