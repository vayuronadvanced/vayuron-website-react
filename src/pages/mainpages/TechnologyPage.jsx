{/*TechnologyPage.jsx*/ }

import { PageBanner, SectionHeader, CTAButton, CardGrid } from '../../components/ui'
import StackSection from '../../components/sections/StackSection'
import Seo from '../../components/seo/Seo'

const techPillars = [
  {
    title: 'Autonomous Flight Systems',
    description:
      'Indigenous autopilot with terrain following, obstacle avoidance, and autonomous return-to-home.',
  },
  {
    title: 'Edge AI Architecture',
    description:
      'Real-time AI inference on embedded hardware without cloud connectivity.',
  },
  {
    title: 'Encrypted Communications',
    description:
      'AES-256 encrypted links with anti-jam and frequency-hopping protection.',
  },
  {
    title: 'Swarm Intelligence',
    description:
      'Autonomous multi-UAV coordination with decentralized decision-making.',
  },
  {
    title: 'Sensor Fusion',
    description:
      'AI-powered fusion of visual, thermal, LiDAR, radar, and SIGINT data.',
  },
  {
    title: 'Indigenous Hardware',
    description:
      'Indian-designed avionics, power systems, and structural components.',
  },
]

const techStack = [
  {
    category: 'UAV Technologies',
    items: [
      'Multirotor Platforms',
      'Fixed Wing Platforms',
      'VTOL Systems',
      'Tactical UAVs',
    ],
  },
  {
    category: 'ISR Systems',
    items: [
      'EO Payloads',
      'Thermal Imaging',
      'Target Tracking',
      'Situational Awareness',
    ],
  },
  {
    category: 'Communication Systems',
    items: [
      'Digital FPV Systems',
      'Secure Data Links',
      'Long-Range Video Transmission',
      'Fiber-Guided Systems',
    ],
  },
  {
    category: 'AI & Software',
    items: [
      'Computer Vision',
      'Target Recognition',
      'Mission Analytics',
      'Data Processing',
    ],
  },
  {
    category: 'Ground Systems',
    items: [
      'Ground Control Stations',
      'Mission Planning',
      'Intelligence Visualization',
      'Fleet Management',
    ],
  },
  {
    category: 'Manufacturing & Integration',
    items: [
      'Carbon Composite Structures',
      'Embedded Electronics',
      'Payload Integration',
      'System Testing',
    ],
  },
]

export default function TechnologyPage() {
  return (
    <>
      <Seo
        title="Technology"
        description="The indigenous technologies powering Vayuron's autonomous UAV, AI, and defence systems."
        path="/technology"
        breadcrumbs={[{ label: 'Technology' }]}
      />

      <main>
        <StackSection index={0}>
          <PageBanner
            eyebrow="Technology"
            title="Indigenous Defence Technology Stack"
            subtitle="Core technology pillars engineered entirely in India for defence-grade operational requirements."
            crumbs={[{ label: 'Technology' }]}
            // backgroundImage="/images/technology-bg.webp"
            backgroundVideoMp4="/videos/Drone3.webm"  //video
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
                backgroundImage: "url('/images/Tech2.webp')",
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

              <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {techPillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-6"
                  >
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-white/100 leading-relaxed group-hover:text-white transition-colors">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </CardGrid>
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
                backgroundImage: "url('/images/Tech4.webp')",
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

              <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
                          className="flex items-center gap-2.5 text-white/100 text-[13px] leading-relaxed group-hover:text-white transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardGrid>
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
                backgroundImage: "url('/images/TechIndigenous.webp')",
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
                  <CardGrid gridClassName="grid grid-cols-1">
                    <div className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-6">
                      <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
                      <p className="text-white/100 text-base leading-7 group-hover:text-white transition-colors">
                        Every algorithm, firmware module, structural design, and manufacturing
                        process in the Vayuron technology stack is developed and owned entirely
                        by Vayuron Advanced Systems. No licensed foreign technology. No
                        third-party dependency risk. Full operational sovereignty for our clients.
                      </p>
                    </div>
                  </CardGrid>
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
                backgroundImage: "url('/images/Tech5.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24 flex items-center justify-center text-center">
              <CardGrid gridClassName="grid grid-cols-1 w-full">
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
              </CardGrid>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}