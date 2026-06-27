import { Helmet } from 'react-helmet-async'
import ParallaxBanner from '../../components/sections/ParallaxBanner'
import AnimatedStatsBar from '../../components/sections/AnimatedStatsBar'
import { FeatureCardEnhanced } from '../../components/ui/cards'
import MagneticButton from '../../components/ui/display/MagneticButton'
import { HUDFrame } from '../../components/ui/display/HUDOverlay'
import { CyanDivider } from '../../components/ui'
import { useGSAPReveal } from '../../hooks/useAnimation'
import { Link } from 'react-router-dom'

export default function SectorPageTemplate({
  title, subtitle, eyebrow, overview, solution,
  stats = [], challenges = [], technologies = [], crumbs = [],
}) {
  const overviewRef = useGSAPReveal({ y: 30 })
  const techRef     = useGSAPReveal({ y: 30, stagger: 0.08 })

  return (
    <>
      <Helmet>
        <title>{title} — Vayuron Advanced Systems</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <main>
        <ParallaxBanner eyebrow={eyebrow} title={title} subtitle={subtitle} crumbs={crumbs} />

        {/* Stats */}
        {stats.length > 0 && (
          <AnimatedStatsBar stats={stats} />
        )}

        {/* Overview + Solution */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <div ref={overviewRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-4">Sector Overview</p>
              <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
                The Challenge
              </h2>
              <p className="text-muted leading-relaxed text-lg">{overview}</p>
            </div>
            {solution && (
              <HUDFrame label="VAYURON SOLUTION">
                <p className="text-text leading-relaxed py-2">{solution}</p>
              </HUDFrame>
            )}
          </div>
        </section>

        {/* Challenges */}
        {challenges.length > 0 && (
          <section className="py-16 bg-surface border-y border-[rgba(0,212,255,0.08)] px-6">
            <div className="max-w-[1400px] mx-auto">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-8">Operational Challenges</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((c, i) => (
                  <FeatureCardEnhanced key={i} icon={c.icon} title={c.title} description={c.description} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-8">Technologies Deployed</p>
            <div ref={techRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies.map((tech, i) => (
                <Link
                  key={i}
                  to={tech.path || '/products'}
                  className="group bg-surface border border-[rgba(0,212,255,0.08)] hover:border-cyan p-6 transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{tech.icon}</div>
                  <h3 className="font-display font-semibold text-white group-hover:text-cyan transition-colors mb-2">{tech.label}</h3>
                  <p className="text-muted text-xs leading-relaxed">{tech.description}</p>
                  <div className="mt-4 h-px w-0 group-hover:w-full bg-cyan transition-all duration-500" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />

        {/* CTA */}
        <section className="py-20 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Deploy in {title}?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Our sector specialists can design a tailored solution for your operational requirements.
          </p>
          <div className="flex justify-center">
            <MagneticButton to="/contact" variant="primary">Start a Conversation</MagneticButton>
          </div>
        </section>
      </main>
    </>
  )
}
