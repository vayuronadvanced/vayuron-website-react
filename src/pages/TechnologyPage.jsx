import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, FeatureCard, CTAButton, CyanDivider } from '../components/ui'

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

      <main>
        <PageBanner
          eyebrow="Technology"
          title="Our Technology Stack"
          subtitle="Six core technology pillars engineered entirely in India for defence-grade operational requirements."
          crumbs={[{ label: 'Technology' }]}
          backgroundImage="/technology-bg.png.png"
        />

        {/* Pillars */}
        {/* ═══════════════════════════════════════
        CORE PILLARS
        ═══════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/Tech2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/15 to-black/75" />

          {/* Content */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6">

            <SectionHeader
              eyebrow="Core Pillars"
              title="Built From First Principles"
              subtitle="Every technology domain developed in-house, ensuring operational sovereignty and deep mission customisation."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {techPillars.map((pillar, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl border border-white/10 backdrop-blur-md bg-black/20 hover:bg-black/35 hover:border-cyan/40 transition-all duration-300 p-8 overflow-hidden"
                >
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />

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
            STACK DETAILS
        ═══════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/Tech4.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75" />

          {/* Content */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6">

            <SectionHeader
              eyebrow="Stack Details"
              title="Technology Components"
              subtitle="The specific technologies and standards deployed across our product lines."
            />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {techStack.map((stack, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-white/10 backdrop-blur-md bg-black/20 hover:bg-black/35 hover:border-cyan/40 transition-all duration-300 p-8 overflow-hidden"
              >

          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />

          <h3 className="font-mono text-xs tracking-widest uppercase text-cyan mb-5">
            {stack.category}
          </h3>

          <ul className="space-y-3">
            {stack.items.map((item, j) => (
              <li
                key={j}
                className="flex items-center gap-3 text-white/75 text-sm group-hover:text-white transition-colors"
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
            IP OWNERSHIP
        ═══════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/TechIndigenous.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/80" />

          {/* Content */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

              {/* Left Side */}
              <div>
                <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-4">
                  IP Ownership
                </p>

                <h2 className="font-display text-4xl font-bold text-white leading-tight">
                  100% Indigenous IP
                </h2>
              </div>

              {/* Right Side */}
              <div className="lg:col-span-2">

                <div className="group relative rounded-2xl border border-white/10 backdrop-blur-md bg-black/20 hover:bg-black/35 hover:border-cyan/40 transition-all duration-300 p-8 overflow-hidden">

                  {/* Cyan Accent */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />

                  <p className="text-white/80 text-lg leading-relaxed group-hover:text-white transition-colors">
                    Every algorithm, firmware module, structural design, and manufacturing
                    process in the Vayuron technology stack is developed and owned entirely
                    by Vayuron Advanced Systems. No licensed foreign technology. No
                    third-party dependency risk. Full operational sovereignty for our
                    clients.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ═══════════════════════════════════════
            TECHNICAL BRIEFING CTA
        ═══════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/Tech5.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/80" />

          {/* Content */}
          <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">

            <div className="group rounded-2xl border border-white/10 backdrop-blur-md bg-black/20 hover:bg-black/35 hover:border-cyan/40 transition-all duration-300 p-12">

              <h2 className="font-display text-4xl font-bold text-white mb-6 group-hover:text-cyan transition-colors">
                Technical Briefings Available
              </h2>

              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10 group-hover:text-white transition-colors">
                Our engineering team can provide detailed technical briefings under NDA
                for qualified defence and government clients.
              </p>

              <CTAButton to="/contact" variant="primary">
                Request a Technical Briefing
              </CTAButton>

            </div>

          </div>

        </section>
      </main>
    </>
  )
}