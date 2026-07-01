import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageBanner, StatCard, CTAButton } from '../../components/ui'

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
          <section className="relative min-h-screen flex items-center overflow-hidden">            
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/Sector2.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/75" />

              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">              {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
            </div>
          </section>
        )}

          {/* Overview */}
          <section className="relative min-h-screen flex items-center overflow-hidden">

            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Sector3.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

                {/* Overview Card */}
                <div className="group relative overflow-hidden rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1">

                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

                  <h2 className="font-display text-xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">
                    Sector Overview
                  </h2>

                  <p className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {overview}
                  </p>

                </div>

                {/* Solution Card */}
                {solution && (
                  <div className="group relative overflow-hidden rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1">

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

                    <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">
                      Vayuron Solution
                    </p>

                    <p className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors">
                      {solution}
                    </p>

                  </div>
                )}

              </div>

            </div>
          </section>

        {/* Challenges */}
        {challenges.length > 0 && (
          <section className="relative min-h-screen flex items-center overflow-hidden">     

            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Sector4.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75" />       

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">

              <h2 className="font-display text-2xl font-bold text-white mb-8">
                Sector Challenges
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {challenges.map((c, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-5 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1"
                  >

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">
                      {c.title}
                    </h3>

                    <p className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors">
                      {c.description}
                    </p>

                  </div>
                ))}

              </div>
            </div>
          </section>
        )}

        {/* Technology Cards */}
        {technologies.length > 0 && (
          <section className="relative min-h-screen flex items-center overflow-hidden">

            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Sector5.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">

              <h2 className="font-display text-2xl font-bold text-white mb-8">
                Technologies Deployed
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {technologies.map((tech, i) => (
                  <Link
                    key={i}
                    to={tech.path || '/products'}
                    className="group relative overflow-hidden rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1"
                  >

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

                    <div className="text-cyan text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">
                      {tech.icon}
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">
                      {tech.label}
                    </h3>

                    <p className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors">
                      {tech.description}
                    </p>

                  </Link>
                ))}

              </div>

            </div>

          </section>
        )}

       {/* CTA */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/Sector6.png')",
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

        </main>
        </>
        )
        }

