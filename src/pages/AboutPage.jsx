import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, StatCard, CTAButton, CyanDivider } from '../components/ui'
import { useScrollReveal } from '../hooks'

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
  const missionRef = useScrollReveal()
  const valuesRef = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>About — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Vayuron Advanced Systems — India's indigenous defence technology company building autonomous UAV, AI, and software systems for national security."
        />
      </Helmet>

      <main>
        <PageBanner
          eyebrow="About Vayuron"
          title="Our Mission"
          subtitle="Building indigenous defence and aerospace technology for India's operational sovereignty."
          crumbs={[{ label: 'About' }]}
          backgroundImage="/FixedWingDRone.png"
        />

        {/* Mission Statement */}
        <section
          ref={missionRef}
          className="reveal py-20 px-6 max-w-[1400px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">
                Why We Exist
              </p>

              <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight">
                India's critical operations deserve indigenous technology
              </h2>

              <p className="text-muted leading-relaxed mb-6">
                Vayuron Advanced Systems was founded on a single conviction: that India's defence forces,
                security agencies, and critical infrastructure operators should not depend on foreign technology
                for their most sensitive operations.
              </p>

              <p className="text-muted leading-relaxed">
                We build the autonomous systems, AI platforms, and defence-grade software that give India
                genuine operational sovereignty — technology designed, manufactured, and supported entirely
                within the country, by engineers who understand the operational context.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard value={4} suffix="" label="Years Operating" />
              <StatCard value={50} suffix="+" label="Deployments" />
              <StatCard value={8} suffix="" label="Sectors Served" />
              <StatCard value={100} suffix="+" label="Team Members" />
            </div>
          </div>
        </section>

        {/* Divider */}
        <CyanDivider className="max-w-[1400px] mx-auto px-6 my-4" />

        {/* Values */}
        <section
          ref={valuesRef}
          className="reveal py-20 px-6 max-w-[1400px] mx-auto"
        >
          <SectionHeader
            eyebrow="Our Values"
            title="What We Stand For"
            subtitle="The principles that guide every engineering decision, partnership, and deployment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-surface border border-[rgba(0,212,255,0.1)] p-8 hover:border-[rgba(0,212,255,0.25)] transition-colors"
              >
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {v.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4 max-w-3xl mx-auto">
            Join Our Mission
          </h2>

          <p className="text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            We are always looking for engineers, researchers, and operators who want to build meaningful technology for national security.
          </p>

          <div className="flex gap-6 justify-center flex-wrap mt-2">
            <CTAButton to="/careers" variant="primary">
              View Open Roles
            </CTAButton>
            <CTAButton to="/contact" variant="secondary">
              Partner With Us
            </CTAButton>
          </div>
        </section>
      </main>
    </>
  )
}