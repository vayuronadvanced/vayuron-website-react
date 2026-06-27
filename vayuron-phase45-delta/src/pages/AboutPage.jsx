import { Helmet } from 'react-helmet-async'
import ParallaxBanner from '../components/sections/ParallaxBanner'
import AnimatedStatsBar from '../components/sections/AnimatedStatsBar'
import ScrollStory from '../components/sections/ScrollStory'
import Timeline from '../components/ui/display/Timeline'
import MagneticButton from '../components/ui/display/MagneticButton'
import { HUDFrame, RadarPing } from '../components/ui/display/HUDOverlay'
import { FeatureCardEnhanced } from '../components/ui/cards'
import { CyanDivider } from '../components/ui'
import { useGSAPReveal, useTextReveal } from '../hooks/useAnimation'

const values = [
  { icon: '🇮🇳', title: 'Indigenous First',    description: 'Every component, algorithm, and process is designed and built in India. We do not import foreign black boxes into national security systems.' },
  { icon: '⚙',   title: 'Engineering Rigour',  description: 'We test to failure, then build margins in. Every product is validated to operate reliably in the worst conditions our clients face.' },
  { icon: '🤝',  title: 'Mission Partnership', description: 'We do not sell products — we build operational capability alongside our clients. Their mission success is our measure of performance.' },
  { icon: '🔒',  title: 'Sovereign Technology',description: 'Our clients own the operational data and capability we provide. No foreign dependency sits between our clients and their systems.' },
]

const timelineEntries = [
  { year: '2020', tag: 'Founded',    title: 'Vayuron Established',          description: 'Founded in Bhopal with a single mission: build indigenous defence technology that gives India genuine operational sovereignty.' },
  { year: '2021', tag: 'Product',    title: 'First UAV Platform Deployed',  description: 'First tactical reconnaissance UAV successfully deployed in field trials with a state security agency. Validated autonomous flight and encrypted datalink.' },
  { year: '2022', tag: 'AI',         title: 'Edge AI Division Launched',    description: 'AI research division established. First computer vision models achieving 95%+ detection accuracy on embedded hardware without cloud connectivity.' },
  { year: '2022', tag: 'Scale',      title: 'Team Grows to 50',            description: 'Expanded engineering team across avionics, AI, software, and systems integration. Manufacturing facility operational in Bhopal.' },
  { year: '2023', tag: 'Sectors',    title: 'Eight Sector Deployments',    description: 'Active deployments across Defence, Smart Cities, Agriculture, Infrastructure, and Disaster Management sectors. 50+ missions completed.' },
  { year: '2024', tag: 'Platform',   title: 'Integrated C2 Stack Released',description: 'Full command-and-control software stack released — ground control station, mission planning, and AI dashboard in one unified platform.' },
  { year: '2025', tag: 'Present',    title: '100+ Team. Scaling Operations',description: 'Team exceeds 100 engineers and operators. Expanding to new sectors and international markets while maintaining 100% indigenous IP.' },
]

const missionPanels = [
  {
    eyebrow: 'The Problem',
    title: 'India\'s Critical Operations Deserve Indigenous Technology',
    body: 'Every critical operation that depends on foreign black-box technology is a vulnerability. When the supplier is offshore, support is uncertain, updates are delayed, and operational data flows through foreign infrastructure. Vayuron was founded to end that dependency for Indian defence and security operations.',
  },
  {
    eyebrow: 'The Approach',
    title: 'Built From First Principles — Not Assembled From Parts',
    body: 'We do not integrate foreign subsystems and call it indigenous. Every algorithm, firmware module, structural design, and manufacturing process in the Vayuron technology stack is developed and owned entirely by Vayuron. This is not marketing — it is an operational requirement that our clients demand.',
  },
]

const team = [
  { initial: 'F', name: 'Founder & CEO',       role: 'Aerospace & Defence',   bio: 'Former defence research scientist with 15 years in unmanned systems and autonomous platforms for national security applications.' },
  { initial: 'C', name: 'CTO',                 role: 'AI & Autonomy',         bio: 'Deep learning researcher specialising in edge AI, computer vision, and autonomous decision systems for contested environments.' },
  { initial: 'H', name: 'Head of Engineering', role: 'Systems Integration',   bio: 'Aerospace engineer with background in avionics design, systems integration, and MIL-STD certification for defence programmes.' },
  { initial: 'O', name: 'Head of Operations',  role: 'Programme Delivery',    bio: 'Programme manager with experience running complex technology deployments for government and defence clients across India.' },
]

export default function AboutPage() {
  const titleRef = useTextReveal({ stagger: 0.05 })
  const bodyRef  = useGSAPReveal({ y: 30, delay: 0.3 })

  return (
    <>
      <Helmet>
        <title>About — Vayuron Advanced Systems</title>
        <meta name="description" content="Vayuron Advanced Systems — India's indigenous defence technology company building autonomous UAV, AI, and software systems for national security." />
      </Helmet>
      <main>
        <ParallaxBanner
          eyebrow="About Vayuron"
          title="Our Mission"
          subtitle="Building indigenous defence and aerospace technology for India's operational sovereignty."
          crumbs={[{ label: 'About' }]}
        />

        {/* Stats */}
        <AnimatedStatsBar stats={[
          { value: 5,   suffix: '+',  label: 'Years Operating' },
          { value: 50,  suffix: '+',  label: 'Deployments' },
          { value: 8,   suffix: '',   label: 'Sectors Served' },
          { value: 100, suffix: '+',  label: 'Team Members' },
        ]} />

        {/* Mission statement */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-5">Why We Exist</p>
              <h2
                ref={titleRef}
                className="font-display font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                India's critical operations deserve indigenous technology
              </h2>
              <div ref={bodyRef}>
                <p className="text-muted leading-relaxed mb-4">
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
            </div>
            <div className="flex flex-col gap-4">
              <HUDFrame label="MISSION STATUS">
                <div className="flex items-center gap-4 py-2">
                  <RadarPing size={56} />
                  <div>
                    <p className="font-mono text-xs text-cyan tracking-widest mb-1">OPERATIONAL</p>
                    <p className="font-mono text-xs text-muted">All systems active — 100% indigenous IP</p>
                  </div>
                </div>
              </HUDFrame>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'IP Ownership',   value: '100%' },
                  { label: 'Made in India',  value: 'Yes' },
                  { label: 'Cloud Dependency', value: 'None' },
                  { label: 'Foreign Parts', value: 'Zero' },
                ].map((item, i) => (
                  <div key={i} className="bg-surface border border-[rgba(0,212,255,0.1)] p-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-1">{item.label}</div>
                    <div className="font-display font-bold text-white text-xl">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission story panels */}
        <ScrollStory panels={missionPanels} />

        {/* Values */}
        <section className="py-24 bg-surface border-y border-[rgba(0,212,255,0.08)] px-6">
          <div className="max-w-[1400px] mx-auto">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-3 text-center">Our Values</p>
            <h2 className="font-display font-bold text-white text-center mb-12" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <FeatureCardEnhanced key={i} icon={v.icon} title={v.title} description={v.description} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <Timeline
          eyebrow="Company History"
          title="From Founding to Field"
          entries={timelineEntries}
        />

        <CyanDivider className="max-w-[1400px] mx-auto px-6 my-4" />

        {/* Team */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-3">Leadership</p>
          <h2 className="font-display font-bold text-white mb-12" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <HUDFrame key={i} label={`PERSONNEL-0${i+1}`}>
                <div className="py-2">
                  <div className="w-12 h-12 rounded-full bg-surface border border-[rgba(0,212,255,0.2)] flex items-center justify-center mb-4">
                    <span className="font-display font-bold text-cyan text-xl">{member.initial}</span>
                  </div>
                  <h3 className="font-sans font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-cyan mb-3 tracking-wide">{member.role}</p>
                  <p className="text-muted text-xs leading-relaxed">{member.bio}</p>
                </div>
              </HUDFrame>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">Engineers, researchers, and operators who want to build meaningful technology for national security.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <MagneticButton to="/careers" variant="primary">View Open Roles</MagneticButton>
            <MagneticButton to="/contact" variant="secondary">Partner With Us</MagneticButton>
          </div>
        </section>
      </main>
    </>
  )
}
