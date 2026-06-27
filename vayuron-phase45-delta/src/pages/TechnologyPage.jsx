import { Helmet } from 'react-helmet-async'
import ParallaxBanner from '../components/sections/ParallaxBanner'
import AnimatedStatsBar from '../components/sections/AnimatedStatsBar'
import { FeatureCardEnhanced } from '../components/ui/cards'
import MagneticButton from '../components/ui/display/MagneticButton'
import { TerminalBlock } from '../components/ui/display/TypewriterText'
import { HUDFrame } from '../components/ui/display/HUDOverlay'
import { CyanDivider } from '../components/ui'
import { useGSAPReveal } from '../hooks/useAnimation'

const techPillars = [
  { icon: '🛸', title: 'Autonomous Flight Systems',  description: 'Indigenous autopilot firmware with sensor fusion, terrain following, obstacle avoidance, and comms-denied return-to-home. Validated across fixed-wing, rotary, and hybrid VTOL platforms.' },
  { icon: '🧠', title: 'Edge AI Architecture',       description: 'Deep learning models optimised for embedded NPUs and GPUs, delivering real-time inference without cloud connectivity. Trained on defence-grade annotated datasets.' },
  { icon: '🔐', title: 'Encrypted Communications',  description: 'Military-grade AES-256 encrypted datalinks with frequency hopping, anti-jam protection, and mesh radio fallback for contested and denied environments.' },
  { icon: '🌐', title: 'Swarm Intelligence',         description: 'Distributed multi-UAV coordination protocols enabling autonomous swarm missions with decentralised decision-making — no single point of failure.' },
  { icon: '📡', title: 'Sensor Fusion',              description: 'Multi-sensor data fusion combining visual, thermal, LiDAR, radar, and SIGINT streams into a unified operational picture with AI-powered correlation.' },
  { icon: '🔧', title: 'Indigenous Hardware',        description: 'All avionics, power systems, and structural components designed and manufactured in India — ensuring full supply chain sovereignty and rapid support.' },
]

const stackGroups = [
  { label: 'Flight Control',   specs: [{ label: 'Autopilot',    value: 'Custom PX4' }, { label: 'Nav',     value: 'INS/GPS Fusion' }, { label: 'Altimetry', value: 'Baro + Optical' }, { label: 'Comms',    value: 'FHSS + Mesh' }] },
  { label: 'AI & Vision',      specs: [{ label: 'Model',        value: 'YOLO-v8+' },   { label: 'Edge HW', value: 'NVIDIA Jetson' }, { label: 'Accuracy',  value: '97.4%' },         { label: 'Latency',  value: '<10 ms' }] },
  { label: 'Software Stack',   specs: [{ label: 'GCS',          value: 'Custom React' },{ label: 'Backend', value: 'Node / Python' },{ label: 'API',       value: 'REST / gRPC' },  { label: 'DB',       value: 'PostgreSQL' }] },
  { label: 'Manufacturing',    specs: [{ label: 'Airframe',     value: 'CFRP' },       { label: 'Tolerance',value: '±0.01 mm' },    { label: 'Testing',   value: 'MIL-STD-810' },  { label: 'Cert',     value: 'DGCA / BIS' }] },
]

const terminalCommands = [
  { type: 'input',   text: 'vayuron --status system' },
  { type: 'output',  text: 'Initialising system check...' },
  { type: 'success', text: '✓ Autopilot firmware v4.2.1 — NOMINAL' },
  { type: 'success', text: '✓ Edge AI runtime v2.8.0 — NOMINAL' },
  { type: 'success', text: '✓ Encrypted datalink — SECURED' },
  { type: 'success', text: '✓ Mission planning module — READY' },
  { type: 'input',   text: 'vayuron --ip-check' },
  { type: 'success', text: '✓ All technology — 100% Indigenous IP' },
]

export default function TechnologyPage() {
  const stackRef = useGSAPReveal({ y: 30, stagger: 0.08 })

  return (
    <>
      <Helmet>
        <title>Technology — Vayuron Advanced Systems</title>
        <meta name="description" content="The indigenous technologies powering Vayuron's autonomous UAV, AI, and defence systems." />
      </Helmet>
      <main>
        <ParallaxBanner
          eyebrow="Technology"
          title="Our Technology Stack"
          subtitle="Six core technology pillars engineered entirely in India for defence-grade operational requirements."
          crumbs={[{ label: 'Technology' }]}
        />

        <AnimatedStatsBar stats={[
          { value: 100, suffix: '%', label: 'Indigenous IP' },
          { value: 97,  suffix: '%', label: 'AI Accuracy' },
          { value: 10,  suffix: 'ms',label: 'Edge Inference' },
          { value: 256, suffix: '-bit', label: 'AES Encryption' },
        ]} dark />

        {/* Pillars */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-3">Core Pillars</p>
          <h2 className="font-display font-bold text-white mb-12" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Built From First Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techPillars.map((p, i) => (
              <FeatureCardEnhanced key={i} icon={p.icon} title={p.title} description={p.description} index={i} />
            ))}
          </div>
        </section>

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />

        {/* Stack + Terminal */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-3">Stack Details</p>
              <h2 className="font-display font-bold text-white mb-8" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)' }}>
                Technology Components
              </h2>
              <div ref={stackRef} className="grid grid-cols-1 gap-4">
                {stackGroups.map((group, i) => (
                  <HUDFrame key={i} label={group.label.toUpperCase()}>
                    <div className="grid grid-cols-4 gap-3 py-2">
                      {group.specs.map((spec, j) => (
                        <div key={j}>
                          <div className="font-mono text-[9px] tracking-widest uppercase text-cyan mb-1">{spec.label}</div>
                          <div className="font-mono text-xs text-white font-bold">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </HUDFrame>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-3">System Verification</p>
              <h2 className="font-display font-bold text-white mb-8" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)' }}>
                Live Status Check
              </h2>
              <TerminalBlock prompt="$" commands={terminalCommands} />

              <div className="mt-6 bg-surface border border-[rgba(0,212,255,0.1)] p-6">
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan mb-3">IP Statement</p>
                <p className="text-muted text-sm leading-relaxed">
                  Every algorithm, firmware module, structural design, and manufacturing process in the
                  Vayuron technology stack is developed and owned entirely by Vayuron Advanced Systems.
                  No licensed foreign technology. No third-party dependency risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Technical Briefings Available</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Detailed technical briefings under NDA for qualified defence and government clients.
          </p>
          <div className="flex justify-center">
            <MagneticButton to="/contact" variant="primary">Request a Technical Briefing</MagneticButton>
          </div>
        </section>
      </main>
    </>
  )
}
