import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, CTAButton, CyanDivider } from '../components/ui'
import { useScrollPin } from '../hooks/useScrollPin'

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

  // ── Section 1: Core Pillars — same pattern as ProductsPreview on Home ──
  const pillarsRef = useScrollPin((tl, el) => {
    const bg      = el.querySelector('[data-pillars-bg]')
    const content = el.querySelector('[data-pillars-content]')
    tl.fromTo(bg,
      { scale: 1.12, filter: 'brightness(0.45)' },
      { scale: 1,    filter: 'brightness(1)',    ease: 'none' },
      0
    ).fromTo(content,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0,  ease: 'none' },
      0
    )
  }, '+=100%')

  // ── Section 2: Stack Details — bg zooms in, content rises ──
  const stackRef = useScrollPin((tl, el) => {
    const bg      = el.querySelector('[data-stack-bg]')
    const content = el.querySelector('[data-stack-content]')
    tl.fromTo(bg,
      { scale: 1.1, filter: 'brightness(0.5)' },
      { scale: 1,   filter: 'brightness(1)',   ease: 'none' },
      0
    ).fromTo(content,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0,  ease: 'none' },
      0
    )
  }, '+=100%')

  // ── Section 3: IP Ownership — hero clip-path style (same as Hero on Home) ──
  const ipRef = useScrollPin((tl, el) => {
    const bg      = el.querySelector('[data-ip-bg]')
    const content = el.querySelector('[data-ip-content]')
    tl.fromTo(bg,
      { scale: 1.08, clipPath: 'inset(0% 0% 0% 0%)' },
      { scale: 1,    clipPath: 'inset(4% 4% 4% 4% round 16px)', ease: 'none' },
      0
    ).fromTo(content,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0,  ease: 'none' },
      0
    )
  }, '+=80%')

  // ── Section 4: CTA — simple fade-up, lighter pin ──
  const ctaRef = useScrollPin((tl, el) => {
    const bg      = el.querySelector('[data-cta-bg]')
    const content = el.querySelector('[data-cta-content]')
    tl.fromTo(bg,
      { scale: 1.06, filter: 'brightness(0.55)' },
      { scale: 1,    filter: 'brightness(1)',    ease: 'none' },
      0
    ).fromTo(content,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0,  ease: 'none' },
      0
    )
  }, '+=80%')

  return (
    <>
      <Helmet>
        <title>Technology — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="The indigenous technologies powering Vayuron's autonomous UAV, AI, and defence systems."
        />
      </Helmet>

      <main>
        <PageBanner
          eyebrow="Technology"
          title="Our Technology Stack"
          subtitle="Six core technology pillars engineered entirely in India for defence-grade operational requirements."
          crumbs={[{ label: 'Technology' }]}
          backgroundImage="/technology-bg.png.png"
        />

        {/* ═══════════════════════════════════════
            SECTION 1 — CORE PILLARS (pinned)
        ═══════════════════════════════════════ */}
        <section
          ref={pillarsRef}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          <div
            data-pillars-bg
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/Tech2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div data-pillars-content className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 flex flex-col justify-center">
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

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />

        {/* ═══════════════════════════════════════
            SECTION 2 — STACK DETAILS (pinned)
        ═══════════════════════════════════════ */}
        <section
          ref={stackRef}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          <div
            data-stack-bg
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/Tech4.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div data-stack-content className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 flex flex-col justify-center">
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

        {/* ═══════════════════════════════════════
            SECTION 3 — IP OWNERSHIP (pinned, clip-path style)
        ═══════════════════════════════════════ */}
        <section
          ref={ipRef}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          <div
            data-ip-bg
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/TechIndigenous.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div data-ip-content className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24 flex items-center">
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

        {/* ═══════════════════════════════════════
            SECTION 4 — TECHNICAL BRIEFING CTA (pinned)
        ═══════════════════════════════════════ */}
        <section
          ref={ctaRef}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          <div
            data-cta-bg
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/Tech5.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div data-cta-content className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24 flex items-center justify-center text-center">
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
      </main>
    </>
  )
}
