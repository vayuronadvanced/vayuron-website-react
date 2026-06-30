import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton, CyanDivider } from '../../components/ui'

export default function ProductPageTemplate({
  title,
  subtitle,
  eyebrow,
  description,
  backgroundImage,
  heroVideo,
  contentBackgroundImage,
  specs = [],
  features = [],
  relatedProducts = [],
  nextProduct = null,
  crumbs = [],
}) {
  return (
    <>
      <Helmet>
        <title>{title} — Vayuron Advanced Systems</title>
        <meta name="description" content={subtitle} />
      </Helmet>

      <main>

        {/* ═══════════════════════════════════════
            PAGE BANNER
        ═══════════════════════════════════════ */}
        <PageBanner
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          crumbs={crumbs}
          backgroundImage={backgroundImage}
        />

        {/* ═══════════════════════════════════════
            VIDEO HERO
        ═══════════════════════════════════════ */}
        
        {heroVideo && (
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

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
        )}

        {/* ═══════════════════════════════════════
            SPECS + CAPABILITIES (over drone BG)
        ═══════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden">

          {/* Full-bleed background — no dimming filter */}
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

          {/* Gradient: dark top/bottom, clear in the middle so drone is visible
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/70 pointer-events-none" /> */}
          

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">

            {/* ── KEY SPECIFICATIONS ── */}
            {specs.length > 0 && (
              <div className="mb-24">
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-2">Technical Data</p>
                <h2 className="font-sans text-2xl font-bold text-white mb-8 uppercase tracking-wide">
                  Key Specifications
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className="group relative rounded-lg border border-white/15 backdrop-blur-sm bg-black/20 hover:bg-black/40 hover:border-cyan/50 transition-all duration-300 p-5 cursor-default"
                    >
                      {/* Cyan accent bar on hover */}
                      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-cyan transition-all duration-300 rounded-t-lg" />
                      <div className="font-mono text-[10px] tracking-widest uppercase text-cyan/80 mb-2">
                        {spec.label}
                      </div>
                      <div className="font-sans font-bold text-white text-2xl">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="mb-24 opacity-30">
              <CyanDivider />
            </div>

            {/* ── CAPABILITIES ── */}
            {features.length > 0 && (
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-2">What It Can Do</p>
                <h2 className="font-sans text-2xl font-bold text-white mb-8 uppercase tracking-wide">
                  Capabilities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="group relative rounded-xl border border-white/10 backdrop-blur-sm bg-black/20 hover:bg-black/40 hover:border-cyan/40 hover:scale-[1.02] transition-all duration-300 p-6 overflow-hidden cursor-default"
                    >
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 right-0 w-full h-[1px] bg-cyan" />
                        <div className="absolute top-0 right-0 w-[1px] h-full bg-cyan" />
                      </div>

                      <div className="text-2xl mb-4">{feature.icon}</div>

                      <h3 className="font-sans font-semibold text-white text-sm mb-2 uppercase tracking-widest group-hover:text-cyan transition-colors duration-200">
                        {feature.title}
                      </h3>

                      <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/75 transition-colors duration-200">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t border-[rgba(0,212,255,0.1)]">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/DroneC.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Dark Overlay : <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" /> */}
        

        {/* Content */}
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

      </main>
    </>
  )
}
