import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageBanner, FeatureCard, SpecCard, CTAButton, CyanDivider } from '../../components/ui'

export default function ProductPageTemplate({
  title,
  subtitle,
  eyebrow,
  description,
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
        />

        {/* Description */}
        <section className="py-16 px-6 max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <p className="text-text text-lg leading-relaxed">{description}</p>
          </div>
        </section>

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
