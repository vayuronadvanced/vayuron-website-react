import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, StatCard, CTAButton, CyanDivider } from '../components/ui'
import { useScrollReveal } from '../hooks'

const values = [
  { icon: '🇮🇳', title: 'Indigenous First',    description: 'Every component, algorithm, and process is designed and built in India. We do not import foreign black boxes into national security systems.' },
  { icon: '⚙',  title: 'Engineering Rigour',   description: 'We test to failure, then build margins in. Every product that leaves Vayuron has been validated to operate reliably in the worst conditions our clients face.' },
  { icon: '🤝', title: 'Mission Partnership',   description: 'We do not sell products — we build operational capability alongside our clients. Their mission success is our measure of performance.' },
  { icon: '🔒', title: 'Sovereign Technology', description: 'Our clients own the operational data and capability we provide. No foreign government, cloud provider, or third-party dependency sits between our clients and their systems.' },
]

const team = [
  { name: 'Founder & CEO',      role: 'Aerospace & Defence',  bio: 'Former defence research scientist with 15 years in unmanned systems and autonomous platforms.' },
  { name: 'CTO',                role: 'AI & Autonomy',        bio: 'Deep learning researcher specialising in edge AI, computer vision, and autonomous decision systems.' },
  { name: 'Head of Engineering', role: 'Systems Integration', bio: 'Aerospace engineer with background in avionics design, systems integration, and MIL-STD certification.' },
  { name: 'Head of Operations',  role: 'Programme Delivery',  bio: 'Programme manager with experience running complex technology deployments for government clients.' },
]

export default function AboutPage() {
  const missionRef = useScrollReveal()
  const valuesRef  = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>About — Vayuron Advanced Systems</title>
        <meta name="description" content="Vayuron Advanced Systems — India's indigenous defence technology company building autonomous UAV, AI, and software systems for national security." />
      </Helmet>
      <main>
        <PageBanner
          eyebrow="About Vayuron"
          title="Our Mission"
          subtitle="Building indigenous defence and aerospace technology for India's operational sovereignty."
          crumbs={[{ label: 'About' }]}
        />

        {/* Mission Statement */}
        <section ref={missionRef} className="reveal py-24 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Why We Exist</p>
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
              <StatCard value={4}   suffix=""   label="Years Operating" />
              <StatCard value={50}  suffix="+"  label="Deployments" />
              <StatCard value={8}   suffix=""   label="Sectors Served" />
              <StatCard value={100} suffix="+"  label="Team Members" />
            </div>
          </div>
        </section>

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />

        {/* Values */}
        <section ref={valuesRef} className="reveal py-24 px-6 max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrow="Our Values"
            title="What We Stand For"
            subtitle="The principles that guide every engineering decision, partnership, and deployment."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={i} className="bg-surface border border-[rgba(0,212,255,0.1)] p-8 flex gap-4">
                <span className="text-3xl flex-shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="py-24 bg-surface border-y border-[rgba(0,212,255,0.1)] px-6">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader
              eyebrow="Leadership"
              title="Our Team"
              subtitle="Engineers, researchers, and operators who have worked at the intersection of technology and national security."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.map((member, i) => (
                <div key={i} className="bg-black border border-[rgba(0,212,255,0.1)] p-6">
                  <div className="w-12 h-12 rounded-full bg-surface border border-[rgba(0,212,255,0.2)] flex items-center justify-center mb-4">
                    <span className="font-display font-bold text-cyan text-lg">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-white mb-1">{member.name}</h3>
                  <p className="font-mono text-xs text-cyan mb-3 tracking-wide">{member.role}</p>
                  <p className="text-muted text-xs leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            We are always looking for engineers, researchers, and operators who want to build meaningful technology for national security.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <CTAButton to="/careers" variant="primary">View Open Roles</CTAButton>
            <CTAButton to="/contact" variant="secondary">Partner With Us</CTAButton>
          </div>
        </section>
      </main>
    </>
  )
}
