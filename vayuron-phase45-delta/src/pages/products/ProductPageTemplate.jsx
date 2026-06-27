import { Helmet } from 'react-helmet-async'
import ParallaxBanner from '../../components/sections/ParallaxBanner'
import { FeatureCardEnhanced } from '../../components/ui/cards'
import MagneticButton from '../../components/ui/display/MagneticButton'
import { SpecAccordion } from '../../components/ui/display/Accordion'
import { HUDFrame, SystemStatusBar } from '../../components/ui/display/HUDOverlay'
import { CyanDivider } from '../../components/ui'
import { useGSAPReveal } from '../../hooks/useAnimation'

export default function ProductPageTemplate({
  title, subtitle, eyebrow, description,
  specGroups = [],   // [{ label, specs: [{label,value}] }]
  specs = [],        // flat array fallback
  features = [],
  nextProduct = null,
  crumbs = [],
}) {
  const descRef = useGSAPReveal({ y: 30 })

  // Convert flat specs to group if no specGroups provided
  const groups = specGroups.length > 0
    ? specGroups
    : specs.length > 0
      ? [{ label: 'Key Specifications', specs }]
      : []

  return (
    <>
      <Helmet>
        <title>{title} — Vayuron Advanced Systems</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <main>
        <ParallaxBanner eyebrow={eyebrow} title={title} subtitle={subtitle} crumbs={crumbs} />

        {/* Status bar */}
        <div className="border-b border-[rgba(0,212,255,0.08)] bg-surface/50 px-6 py-3">
          <div className="max-w-[1400px] mx-auto">
            <SystemStatusBar />
          </div>
        </div>

        {/* Description */}
        <section className="py-16 px-6 max-w-[1400px] mx-auto">
          <div ref={descRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-text text-lg leading-relaxed">{description}</p>
            </div>
            <HUDFrame label="PRODUCT STATUS">
              <div className="py-2 space-y-3">
                {[
                  { label: 'Availability',  value: 'In Production' },
                  { label: 'Support',       value: '24/7 Ops' },
                  { label: 'IP',            value: '100% Indigenous' },
                  { label: 'Certification', value: 'DGCA / MIL-STD' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-dim">{item.label}</span>
                    <span className="font-mono text-[10px] text-cyan">{item.value}</span>
                  </div>
                ))}
              </div>
            </HUDFrame>
          </div>
        </section>

        {/* Specs accordion */}
        {groups.length > 0 && (
          <section className="py-12 px-6 max-w-[1400px] mx-auto">
            <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-6">Specifications</p>
            <SpecAccordion groups={groups} />
          </section>
        )}

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />

        {/* Features */}
        {features.length > 0 && (
          <section className="py-16 px-6 max-w-[1400px] mx-auto">
            <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-6">Capabilities</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <FeatureCardEnhanced key={i} icon={f.icon} title={f.title} description={f.description} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Interested in {title}?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">Speak with our engineering team about your operational requirements.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <MagneticButton to="/contact" variant="primary">Request a Briefing</MagneticButton>
            {nextProduct && (
              <MagneticButton to={nextProduct.path} variant="secondary">
                Next: {nextProduct.label} →
              </MagneticButton>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
