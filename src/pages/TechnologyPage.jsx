import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, FeatureCard, CTAButton, CyanDivider } from '../components/ui'

const techPillars = [
  {
    icon: '🛸',
    title: 'Autonomous Flight Systems',
    description: 'Indigenous autopilot firmware with sensor fusion, terrain following, obstacle avoidance, and comms-denied return-to-home. Validated across fixed-wing, rotary, and hybrid VTOL platforms.',
  },
  {
    icon: '🧠',
    title: 'Edge AI Architecture',
    description: 'Deep learning models optimised for embedded NPUs and GPUs, delivering real-time inference without cloud connectivity. Models trained on defence-grade annotated datasets.',
  },
  {
    icon: '🔐',
    title: 'Encrypted Communications',
    description: 'Military-grade AES-256 encrypted datalinks with frequency hopping, anti-jam protection, and mesh radio fallback for contested and denied environments.',
  },
  {
    icon: '🌐',
    title: 'Swarm Intelligence',
    description: 'Distributed multi-UAV coordination protocols enabling autonomous swarm missions with decentralised decision-making — no single point of failure or control.',
  },
  {
    icon: '📡',
    title: 'Sensor Fusion',
    description: 'Multi-sensor data fusion combining visual, thermal, LiDAR, radar, and SIGINT streams into a unified operational picture with AI-powered correlation.',
  },
  {
    icon: '🔧',
    title: 'Indigenous Hardware',
    description: 'All avionics, power systems, and structural components designed and manufactured in India — ensuring full supply chain sovereignty and rapid support.',
  },
]

const techStack = [
  { category: 'Flight Control',   items: ['Custom Autopilot (PX4-derived)', 'INS/GPS Fusion', 'Barometric Altimetry', 'Optical Flow'] },
  { category: 'AI & Vision',      items: ['YOLO-v8 Variants', 'Thermal Neural Networks', 'SAR Processing', 'Federated Learning'] },
  { category: 'Communications',   items: ['FHSS Radio', '4G/5G LTE', 'SATCOM (VSAT)', 'Mesh Networking'] },
  { category: 'Ground Systems',   items: ['GCS Software Suite', 'Mission Planning', 'Digital Twin', 'C2 Backend'] },
  { category: 'Manufacturing',    items: ['CFRP Fabrication', 'CNC Machining', '3D Metal Print', 'PCB Design'] },
  { category: 'Certification',    items: ['DGCA Compliance', 'MIL-STD-810', 'BIS Certification', 'DO-160 Testing'] },
]

export default function TechnologyPage() {
  return (
    <>
      <Helmet>
        <title>Technology — Vayuron Advanced Systems</title>
        <meta name="description" content="The indigenous technologies powering Vayuron's autonomous UAV, AI, and defence systems." />
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
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrow="Core Pillars"
            title="Built From First Principles"
            subtitle="Every technology domain developed in-house, ensuring operational sovereignty and deep mission customisation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techPillars.map((pillar, i) => (
              <FeatureCard key={i} icon={pillar.icon} title={pillar.title} description={pillar.description} />
            ))}
          </div>
        </section>

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />

        {/* Tech Stack Grid */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrow="Stack Details"
            title="Technology Components"
            subtitle="The specific technologies and standards deployed across our product lines."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((stack, i) => (
              <div key={i} className="bg-surface border border-[rgba(0,212,255,0.1)] p-6">
                <h3 className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-muted text-sm">
                      <span className="w-1 h-1 rounded-full bg-dim flex-shrink-0"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* IP Statement */}
        <section className="py-16 bg-surface border-t border-b border-[rgba(0,212,255,0.1)] px-6">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-12">
            <div className="lg:w-1/3">
              <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">IP Ownership</p>
              <h2 className="font-display text-3xl font-bold text-white">100% Indigenous IP</h2>
            </div>
            <div className="lg:w-2/3">
              <p className="text-muted leading-relaxed text-lg">
                Every algorithm, firmware module, structural design, and manufacturing process in the Vayuron
                technology stack is developed and owned entirely by Vayuron Advanced Systems. No licensed
                foreign technology. No third-party dependency risk. Full operational sovereignty for our clients.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Technical Briefings Available</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Our engineering team can provide detailed technical briefings under NDA for qualified defence and government clients.
          </p>
          <CTAButton to="/contact" variant="primary">Request a Technical Briefing</CTAButton>
        </section>
      </main>
    </>
  )
}
