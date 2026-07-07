{/*TechnologyPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, CTAButton } from '../components/ui'
import StackSection from '../components/sections/StackSection'

const techPillars = [
  {
    title: 'Autonomous Flight Systems',
    description:
      'Indigenous autopilot firmware with sensor fusion, terrain following, obstacle avoidance, and comms-denied return-to-home. Validated across fixed-wing, rotary, and hybrid VTOL platforms.',
  },
  {
    title: 'Edge AI Architecture',
    description:
      'Deep learning models optimised for embedded NPUs and GPUs, delivering real-time inference without cloud connectivity. Models trained on defence-grade annotated datasets.',
  },
  {
    title: 'Encrypted Communications',
    description:
      'Military-grade AES-256 encrypted datalinks with frequency hopping, anti-jam protection, and mesh radio fallback for contested and denied environments.',
  },
  {
    title: 'Swarm Intelligence',
    description:
      'Distributed multi-UAV coordination protocols enabling autonomous swarm missions with decentralised decision-making — no single point of failure or control.',
  },
  {
    title: 'Sensor Fusion',
    description:
      'Multi-sensor data fusion combining visual, thermal, LiDAR, radar, and SIGINT streams into a unified operational picture with AI-powered correlation.',
  },
  {
    title: 'Indigenous Hardware',
    description:
      'All avionics, power systems, and structural components designed and manufactured in India — ensuring full supply chain sovereignty and rapid support.',
  },
]

const techStack = [
  {
    category: 'Flight Control',
    items: ['Custom Autopilot (PX4-derived)', 'INS/GPS Fusion', 'Barometric Altimetry', 'Optical Flow'],
  },
  {
    category: 'AI & Vision',
    items: ['YOLO-v8 Variants', 'Thermal Neural Networks', 'SAR Processing', 'Federated Learning'],
  },
  {
    category: 'Communications',
    items: ['FHSS Radio', '4G/5G LTE', 'SATCOM (VSAT)', 'Mesh Networking'],
  },
  {
    category: 'Ground Systems',
    items: ['GCS Software Suite', 'Mission Planning', 'Digital Twin', 'C2 Backend'],
  },
  {
    category: 'Manufacturing',
    items: ['CFRP Fabrication', 'CNC Machining', '3D Metal Print', 'PCB Design'],
  },
  {
    category: 'Certification',
    items: ['DGCA Compliance', 'MIL-STD-810', 'BIS Certification', 'DO-160 Testing'],
  },
]

export default function TechnologyPage() {
  return (
    <>
      <Helmet>
        <title>Technology — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="The indigenous technologies powering Vayuron's autonomous UAV, AI, and defence systems."
        />
      </Helmet>

      {/* Stacked scroll transitions: each StackSection pins in place
          (position: sticky) while the next one scrolls up to cover it.
          Same pattern as HomePage — increasing index per section, and
          no internal ScrollTrigger pins inside the sections themselves
          (StackSection owns the pin/cover choreography). */}
      <main>
        <StackSection index={0}>
          <PageBanner
            eyebrow="Technology"
            title="Our Technology Stack"
            subtitle="Six core technology pillars engineered entirely in India for defence-grade operational requirements."
            crumbs={[{ label: 'Technology' }]}
            // backgroundImage="/technology-bg.png.png"
            backgroundVideoMp4="/Drone1.mp4"  //video
          />
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 1 — CORE PILLARS
        ═══════════════════════════════════════ */}
        <StackSection index={1}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Tech2.png')",  
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 flex flex-col justify-center">
              <SectionHeader
                eyebrow="Core Pillars"
                title="Built From First Principles"
                subtitle="Every technology domain developed in-house, ensuring operational sovereignty and deep mission customisation."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {techPillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-6"
                  >
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-white/75 leading-relaxed group-hover:text-white transition-colors">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 2 — STACK DETAILS
        ═══════════════════════════════════════ */}
        <StackSection index={2}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Tech4.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 flex flex-col justify-center">
              <SectionHeader
                eyebrow="Stack Details"
                title="Technology Components"
                subtitle="The specific technologies and standards deployed across our product lines."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {techStack.map((stack, i) => (
                  <div
                    key={i}
                    className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-6"
                  >
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
                    <h3 className="font-mono text-[11px] tracking-[0.18em] uppercase text-cyan mb-4">
                      {stack.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {stack.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2.5 text-white/75 text-[13px] leading-relaxed group-hover:text-white transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 3 — IP OWNERSHIP
        ═══════════════════════════════════════ */}
        <StackSection index={3}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/TechIndigenous.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                <div>
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-4">
                    IP Ownership
                  </p>
                  <h2 className="font-display text-4xl font-bold text-white leading-tight">
                    100% Indigenous IP
                  </h2>
                </div>

                <div className="lg:col-span-2">
                  <div className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-6">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
                    <p className="text-white/80 text-base leading-7 group-hover:text-white transition-colors">
                      Every algorithm, firmware module, structural design, and manufacturing
                      process in the Vayuron technology stack is developed and owned entirely
                      by Vayuron Advanced Systems. No licensed foreign technology. No
                      third-party dependency risk. Full operational sovereignty for our clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══════════════════════════════════════
            SECTION 4 — TECHNICAL BRIEFING CTA
        ═══════════════════════════════════════ */}
        <StackSection index={4} dim={false}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Tech5.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24 flex items-center justify-center text-center">
              <div className="group relative w-full rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-8 md:p-10">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 group-hover:text-cyan transition-colors">
                  Technical Briefings Available
                </h2>

                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 group-hover:text-white transition-colors">
                  Our engineering team can provide detailed technical briefings under NDA
                  for qualified defence and government clients.
                </p>

                <CTAButton
                  href="/documents/vayuron-technology-brochure.pdf"
                  variant="primary"
                >
                  Download Technology Brochure
                </CTAButton>
              </div>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
