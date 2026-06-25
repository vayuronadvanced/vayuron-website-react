import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageBanner, StatCard, FeatureCard, CTAButton, CyanDivider } from '../../components/ui'
import { PRODUCTS } from '../../data/siteData'

export default function SectorPageTemplate({
  title,
  subtitle,
  eyebrow,
  overview,
  stats = [],
  challenges = [],
  solution,
  technologies = [],
  crumbs = [],
}) {
  return (
    <>
      <Helmet>
        <title>{title} — Vayuron Advanced Systems</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <main>
        <PageBanner
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          crumbs={crumbs}
        />

        {/* Stats */}
        {stats.length > 0 && (
          <section className="bg-surface border-b border-[rgba(0,212,255,0.1)] py-12 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <StatCard key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
          </section>
        )}

        {/* Overview */}
        <section className="py-16 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">Sector Overview</h2>
              <p className="text-muted leading-relaxed">{overview}</p>
            </div>
            {solution && (
              <div className="bg-surface border border-[rgba(0,212,255,0.15)] p-8">
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Vayuron Solution</p>
                <p className="text-text leading-relaxed">{solution}</p>
              </div>
            )}
          </div>
        </section>

        {/* Challenges */}
        {challenges.length > 0 && (
          <section className="py-16 bg-surface border-y border-[rgba(0,212,255,0.08)] px-6">
            <div className="max-w-[1400px] mx-auto">
              <h2 className="font-display text-2xl font-bold text-white mb-8">Sector Challenges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((c, i) => (
                  <FeatureCard key={i} icon={c.icon} title={c.title} description={c.description} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technology Cards */}
        {technologies.length > 0 && (
          <section className="py-16 px-6 max-w-[1400px] mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-8">Technologies Deployed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies.map((tech, i) => (
                <Link
                  key={i}
                  to={tech.path || '/products'}
                  className="group bg-surface border border-[rgba(0,212,255,0.1)] hover:border-cyan p-6 transition-all"
                >
                  <div className="text-2xl mb-3">{tech.icon}</div>
                  <h3 className="font-display font-semibold text-white group-hover:text-cyan transition-colors mb-2">
                    {tech.label}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">{tech.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Deploy in {title}?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Our sector specialists can design a tailored solution for your operational requirements.
          </p>
          <CTAButton to="/contact" variant="primary">Start a Conversation</CTAButton>
        </section>
      </main>
    </>
  )
}
