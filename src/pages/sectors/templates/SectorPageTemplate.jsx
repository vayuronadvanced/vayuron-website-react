import { Helmet } from 'react-helmet-async'
import { PageBanner, StatCard, CTAButton, InfoCard } from '../../../components/ui'
import StackSection from '../../../components/sections/StackSection'

export default function SectorPageTemplate({
  title,
  subtitle,
  eyebrow,
  overview,
  stats = [],
  challenges = [],  // each: { title, description, bullets? }
  solution,
  technologies = [], // each: { icon, label, description, path, bullets? }
  crumbs = [],
  backgroundImage,      // poster / reduced-motion fallback for the banner video
  backgroundVideoMp4,    // optional — enables the video hero on this sector's banner
  backgroundVideoWebm,   // optional
}) {
  const hasStats = stats.length > 0
  const hasChallenges = challenges.length > 0
  const hasTechnologies = technologies.length > 0

  // Sections stack in DOM order with increasing index. Banner, Stats,
  // Challenges, and Technologies are all optional, so indices after each
  // one shift depending on what actually renders — compute them in order
  // rather than hardcoding, so any combination of props stays correct.
  let idx = 0
  const bannerIndex = idx++
  const statsIndex = hasStats ? idx++ : null
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

        {/* Stats */}
        {hasStats && (
          <StackSection index={statsIndex}>
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/Tablong.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/75" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-10 sm:py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {stats.map((stat, i) => (
                    <StatCard key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
                  ))}
                </div>
              </div>
            </section>
          </StackSection>
        )}

        {/* Overview */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                <InfoCard title="Sector Overview" description={overview} />
                {solution && <InfoCard title="Vayuron Solution" description={solution} />}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {challenges.map((c, i) => (
                    <InfoCard
                      key={i}
                      title={c.title}
                      description={c.description}
                      bullets={c.bullets || []}
                      className="p-5"
                    />
                  ))}
                </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                </div>
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
              <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
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
