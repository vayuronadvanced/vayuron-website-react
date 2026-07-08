{/*AboutPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, StatCard, CTAButton } from '../components/ui'
import StackSection from '../components/sections/StackSection'

// ─── What We Do ─────────────────────────────────────────────────────────
const capabilities = [
  {
    title: 'UAV Systems',
    description: 'Fixed-wing, rotary, and hybrid VTOL platforms engineered for autonomous, multi-mission operations.',
  },
  {
    title: 'AI Mission Systems',
    description: 'Edge-deployed AI for real-time targeting, navigation, and decision support in disconnected environments.',
  },
  {
    title: 'ISR Technologies',
    description: 'Intelligence, surveillance, and reconnaissance payloads delivering persistent situational awareness.',
  },
  {
    title: 'Robotics',
    description: 'Ground and aerial robotic platforms built for hazardous, remote, and high-tempo operational environments.',
  },
  {
    title: 'Industrial Drone Solutions',
    description: 'Purpose-built UAV platforms for inspection, monitoring, and mapping across infrastructure and industry.',
  },
  {
    title: 'Secure Communication Systems',
    description: 'Resilient, encrypted communication links engineered for contested and mission-critical operations.',
  },
]

// ─── Industries We Serve ────────────────────────────────────────────────
const industries = [
  'Defence',
  'Homeland Security',
  'Government',
  'Utilities',
  'Infrastructure',
  'Renewable Energy',
  'Agriculture',
  'Research Organizations',
]

// ─── Why Choose Vayuron ─────────────────────────────────────────────────
const differentiators = [
  {
    title: 'Indigenous Engineering',
    description: 'Every platform is designed, engineered, and built within India, end to end.',
  },
  {
    title: 'Mission-Oriented Development',
    description: 'Systems built around real operational requirements, not lab-stage concepts.',
  },
  {
    title: 'Deep Technology Expertise',
    description: 'Multidisciplinary engineering spanning autonomy, AI, avionics, and secure systems.',
  },
  {
    title: 'Rapid Innovation',
    description: 'Compressed development cycles that move from concept to field-ready hardware fast.',
  },
  {
    title: 'Multi-Domain Experience',
    description: 'Proven deployments across defence, industrial, infrastructure, and government sectors.',
  },
  {
    title: 'Operational Reliability',
    description: 'Platforms engineered and validated to perform under the toughest field conditions.',
  },
]

// ─── Core Values ────────────────────────────────────────────────────────
const values = [
  {
    title: 'Engineering Excellence',
    description:
      'We hold every platform to a defence-grade engineering standard, validated for performance under real operational conditions.'
  },
  {
    title: 'Innovation with Purpose',
    description:
      'Every innovation is driven by a genuine operational need, not novelty for its own sake.'
  },
  {
    title: 'Mission First',
    description:
      'We build technology around the mission it must serve, not the other way around.'
  },
  {
    title: 'Operational Reliability',
    description:
      'Our systems are engineered to perform consistently in the field, not just in the lab.'
  },
  {
    title: 'Indigenous Innovation',
    description:
      'We design and build within India, strengthening the nation\u2019s technological self-reliance with every platform.'
  },
  {
    title: 'Integrity & Accountability',
    description:
      'We stand behind every system we deliver and take full ownership of its performance in the field.'
  },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Vayuron Advanced Systems develops indigenous autonomous systems, UAV technologies, AI-enabled platforms, and mission-critical engineering solutions for defence, industrial, infrastructure, and government applications."
        />
      </Helmet>

      {/* Stacked scroll transitions — same pattern as HomePage/TechnologyPage:
          each StackSection pins (position: sticky) while the next one
          scrolls up to cover it. */}
      <main>
        {/* ═══════════════════════════════════════
            SECTION 1 — HERO
        ═══════════════════════════════════════ */}
        <StackSection index={0}>
          <PageBanner
            eyebrow="About Vayuron"
            title="Engineering Intelligent Systems for Mission-Critical Operations"
            subtitle="VAYURON Advanced Systems develops indigenous autonomous systems, UAV technologies, AI-enabled platforms, and mission-critical engineering solutions for defence, industrial, infrastructure, and government applications."
            crumbs={[{ label: 'About' }]}
            backgroundImage="/FixedWingDRone.png"
            backgroundVideoMp4="/Drone1.mp4"
          />
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 2 — OUR STORY
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

            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24">
              <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">
                Our Story
              </p>
              <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight">
                Built in the field, engineered for the mission
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Vayuron began with hands-on drone engineering and real field operations —
                building, flying, and refining platforms under the same conditions our
                clients operate in. That grounding shaped how we work: every system is
                proven in the field before it is called finished.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                That practical foundation has since grown into a full-fledged advanced
                autonomous systems company, built on a commitment to indigenous
                innovation. Our focus remains unchanged — we engineer deployable,
                field-ready technology, not lab concepts that never leave the bench.
              </p>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 3 — MISSION & VISION
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

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader
                eyebrow="Mission & Vision"
                title="What Drives Us"
                centered
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="group relative rounded-xl border border-white/10 backdrop-blur-md bg-black/20 hover:bg-black/35 hover:border-cyan/40 transition-all duration-300 p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Mission</p>
                  <p className="text-white/85 text-lg leading-relaxed group-hover:text-white transition-colors">
                    Engineer reliable, intelligent, and scalable autonomous systems that
                    solve critical operational challenges while strengthening India's
                    technological self-reliance.
                  </p>
                </div>

                <div className="group relative rounded-xl border border-white/10 backdrop-blur-md bg-black/20 hover:bg-black/35 hover:border-cyan/40 transition-all duration-300 p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Vision</p>
                  <p className="text-white/85 text-lg leading-relaxed group-hover:text-white transition-colors">
                    Become a globally respected autonomous systems company developing
                    indigenous technologies for defence, industrial, infrastructure, and
                    public-sector applications.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 4 — WHAT WE DO
        ═══════════════════════════════════════ */}
        <StackSection index={3}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/About4.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 py-24">
              <SectionHeader
                eyebrow="What We Do"
                title="Core Engineering Domains"
                subtitle="Six technology domains engineered for defence, industrial, and government operations."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {capabilities.map((c, i) => (
                  <div
                    key={i}
                    className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
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
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 5 — INDUSTRIES WE SERVE
        ═══════════════════════════════════════ */}
        <StackSection index={4}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/drone-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader
                eyebrow="Industries We Serve"
                title="Where We Operate"
                centered
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {industries.map((label, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-center text-center rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-4 py-6 hover:border-cyan/50 hover:bg-black/30 transition-all duration-300"
                  >
                    <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-white/80 group-hover:text-cyan transition-colors">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 6 — WHY CHOOSE VAYURON
        ═══════════════════════════════════════ */}
        <StackSection index={5}>
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
            <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 py-24">
              <SectionHeader
                eyebrow="Why Choose Vayuron"
                title="Built for Operational Reality"
                subtitle="Six pillars that define how we engineer, deploy, and support every platform."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {differentiators.map((d, i) => (
                  <div
                    key={i}
                    className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/25 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/40 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                      {d.title}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors">
                      {d.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 7 — COMPANY STATS
        ═══════════════════════════════════════ */}
        <StackSection index={6}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Operational.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader
                eyebrow="By the Numbers"
                title="Company Stats"
                centered
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                <StatCard value={4}   suffix=""  label="Years" />
                <StatCard value={50}  suffix="+" label="Deployments" />
                <StatCard value={8}   suffix=""  label="Sectors" />
                <StatCard value={100} suffix="+" label="Team" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="text-center rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-6 py-5">
                  <div className="font-mono text-xs tracking-widest uppercase text-cyan">
                    Mission-Critical Solutions
                  </div>
                </div>
                <div className="text-center rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-6 py-5">
                  <div className="font-mono text-xs tracking-widest uppercase text-cyan">
                    Indigenous Technology Focus
                  </div>
                </div>
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 8 — CORE VALUES
        ═══════════════════════════════════════ */}
        <StackSection index={7}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
            SECTION 9 — RESEARCH & INNOVATION
        ═══════════════════════════════════════ */}
        <StackSection index={8}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/TechIndigenous.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-black/55" />

            <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 py-24 text-center">
              <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">
                R&amp;D
              </p>
              <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight">
                Research &amp; Innovation
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Continuous research drives every VAYURON platform, with ongoing work in
                autonomous UAV systems, AI-assisted operations, computer vision,
                robotics, secure communications, and next-generation mission
                technologies.
              </p>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 10 — CTA
        ═══════════════════════════════════════ */}
        <StackSection index={9} dim={false}>
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
