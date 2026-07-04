import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, StatCard, CTAButton } from '../components/ui'
import StackSection from '../components/sections/StackSection'

const values = [
  {
    title: 'Indigenous First',
    description:
      'Every component, algorithm, and process is designed and built in India. We do not import foreign black boxes into national security systems.'
  },
  {
    title: 'Engineering Rigour',
    description:
      'We test to failure, then build margins in. Every product that leaves Vayuron has been validated to operate reliably in the worst conditions our clients face.'
  },
  {
    title: 'Mission Partnership',
    description:
      'We do not sell products — we build operational capability alongside our clients. Their mission success is our measure of performance.'
  },
  {
    title: 'Sovereign Technology',
    description:
      'Our clients own the operational data and capability we provide. No foreign government, cloud provider, or third-party dependency sits between our clients and their systems.'
  },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Vayuron Advanced Systems — India's indigenous defence technology company building autonomous UAV, AI, and software systems for national security."
        />
      </Helmet>

      {/* Stacked scroll transitions — same pattern as HomePage/TechnologyPage:
          each StackSection pins (position: sticky) while the next one
          scrolls up to cover it. */}
      <main>
        <StackSection index={0}>
          <PageBanner
            eyebrow="About Vayuron"
            title="Our Mission"
            subtitle="Building indigenous defence and aerospace technology for India's operational sovereignty."
            crumbs={[{ label: 'About' }]}
            backgroundImage="/FixedWingDRone.png"
            backgroundVideoMp4="/Drone1.mp4"
          />
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 2 — MISSION
        ═══════════════════════════════════════ */}
        <StackSection index={1}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/about2.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">
                    Why We Exist
                  </p>
                  <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight">
                    India's critical operations deserve indigenous technology
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Vayuron Advanced Systems was founded on a single conviction: that
                    India's defence forces, security agencies, and critical infrastructure
                    operators should not depend on foreign technology for their most
                    sensitive operations.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    We build the autonomous systems, AI platforms, and defence-grade
                    software that give India genuine operational sovereignty —
                    technology designed, manufactured, and supported entirely within the
                    country, by engineers who understand the operational context.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatCard value={4}   suffix=""  label="Years Operating" />
                  <StatCard value={50}  suffix="+" label="Deployments" />
                  <StatCard value={8}   suffix=""  label="Sectors Served" />
                  <StatCard value={100} suffix="+" label="Team Members" />
                </div>
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 3 — VALUES
        ═══════════════════════════════════════ */}
        <StackSection index={2}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/about3.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              <SectionHeader
                eyebrow="Our Values"
                title="What We Stand For"
                subtitle="The principles that guide every engineering decision, partnership, and deployment."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {values.map((v, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl border border-white/10 backdrop-blur-md bg-black/20 hover:bg-black/35 hover:border-cyan/40 transition-all duration-300 p-8 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
                    <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-white/75 leading-relaxed group-hover:text-white transition-colors">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 4 — CTA
        ═══════════════════════════════════════ */}
        <StackSection index={3} dim={false}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/About4.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Join Our Mission
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                We are always looking for engineers, researchers, and operators who want
                to build meaningful technology for national security.
              </p>
              <div className="flex justify-center gap-5 flex-wrap mt-10">
                <CTAButton to="/careers" variant="primary">
                  View Open Roles
                </CTAButton>
                <CTAButton to="/contact" variant="secondary">
                  Partner With Us
                </CTAButton>
              </div>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
