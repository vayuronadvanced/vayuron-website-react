import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageBanner, FeatureCard, SpecCard, CTAButton, CyanDivider } from '../../components/ui'

export default function ProductPageTemplate({
  title,
  subtitle,
  eyebrow,
  description,
  backgroundImage,
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
        <PageBanner
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          crumbs={crumbs}
          backgroundImage={backgroundImage}
        />
        
        {/* UAV VIDEO SECTION */}
          <section className="relative w-full h-[500px] overflow-hidden">

            {/* 🎥 BACKGROUND VIDEO */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/Drone1.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            {/* 🔳 DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50" />

            {/* OPTIONAL TITLE OVER VIDEO */}
            <div className="relative z-10 h-full flex items-center px-6 max-w-[1400px] mx-auto">
              <div className="max-w-2xl">
                <p className="text-cyan text-xs tracking-widest uppercase mb-3">
                  Product Overview
                </p>

                <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
                  UAV Systems in Action
                </h2>

                <p className="text-gray-300 text-base leading-relaxed">
                  Autonomous aerial platforms designed for real-world mission environments.
                </p>
              </div>
            </div>

          </section>

        {/* Description */}

        {/* Specs */}
        {specs.length > 0 && (
          <section className="py-12 px-6 max-w-[1400px] mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-8">Key Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {specs.map((spec, i) => (
                <SpecCard key={i} label={spec.label} value={spec.value} />
              ))}
            </div>
          </section>
        )}

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />

        {/* Features */}
        {features.length > 0 && (
          <section className="py-16 px-6 max-w-[1400px] mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-8">Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <FeatureCard
                  key={i}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Interested in {title}?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Speak with our engineering team about your operational requirements.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <CTAButton to="/contact" variant="primary">Request a Briefing</CTAButton>
            {nextProduct && (
              <CTAButton to={nextProduct.path} variant="secondary">
                Next: {nextProduct.label} →
              </CTAButton>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
