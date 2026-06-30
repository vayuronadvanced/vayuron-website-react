import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton } from '../../components/ui'

const DRONES = [
  {
    id: 'interceptor',
    label: 'Interceptor',
    tagline: 'High-Speed Counter-Drone Platform',
    description: 'Rapid-response intercept platform built to neutralise hostile aerial threats within seconds of detection.',
    specs: [
      { label: 'Max Speed', value: '180 km/h' },
      { label: 'Response Time', value: '< 8 sec' },
      { label: 'Endurance', value: '25 min' },
    ],
  },
  {
    id: 'ghost-stalker',
    label: 'Ghost Stalker — VTOL',
    tagline: 'Long-Endurance VTOL ISR Platform',
    description: 'Vertical take-off ISR platform for persistent surveillance and strategic observation missions.',
    specs: [
      { label: 'Endurance', value: '8+ Hours' },
      { label: 'Max Altitude', value: '5,000 m' },
      { label: 'Launch Mode', value: 'VTOL' },
    ],
  },
  {
    id: 'agni-fpv',
    label: 'Agni FPV',
    tagline: 'Tactical FPV Strike Platform',
    description: 'Compact, agile FPV system engineered for precision reconnaissance and rapid tactical deployment.',
    specs: [
      { label: 'Top Speed', value: '140 km/h' },
      { label: 'Flight Time', value: '12 min' },
      { label: 'Profile', value: 'Low Observable' },
    ],
  },
  {
    id: 'mvtk',
    label: 'MVTK Drone Communication',
    tagline: 'Multi-Vector Tactical Comms',
    description: 'Real-time multi-user video relay and communication system for coordinated drone operations.',
    specs: [
      { label: 'Latency', value: '< 150 ms' },
      { label: 'Range', value: '15 km' },
      { label: 'Encryption', value: 'AES-256' },
    ],
  },
]

export default function DroneModelsPage() {
  return (
    <>
      <Helmet>
        <title>Tactical Drone Models — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Vayuron's tactical drone lineup: Interceptor, Ghost Stalker VTOL, Agni FPV, and MVTK Drone Communication."
        />
      </Helmet>

      <main>
        <PageBanner
          eyebrow="Product Line"
          title="Tactical Drone Models"
          subtitle="Purpose-built unmanned platforms engineered for intercept, surveillance, strike, and communication missions."
          crumbs={[{ label: 'Products', path: '/products' }, { label: 'Tactical Drone Models' }]}
          backgroundImage="/Quadcopter.png"
        />

        <section className="py-20 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DRONES.map((drone) => (
              <div
                key={drone.id}
                className="group relative rounded-xl border border-white/10 backdrop-blur-sm bg-black/20 hover:bg-black/40 hover:border-cyan/40 transition-all duration-300 p-8 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-cyan transition-all duration-300" />

                <p className="font-mono text-[10px] tracking-widest uppercase text-cyan/80 mb-2">
                  {drone.tagline}
                </p>
                <h2 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">
                  {drone.label}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {drone.description}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {drone.specs.map((spec, i) => (
                    <div key={i} className="border border-white/10 rounded-lg p-3">
                      <div className="font-mono text-[9px] tracking-widest uppercase text-cyan/70 mb-1">
                        {spec.label}
                      </div>
                      <div className="font-display font-bold text-white text-base">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Interested in These Platforms?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Speak with our engineering team about deployment requirements and mission-specific configurations.
          </p>
          <CTAButton to="/contact" variant="primary">
            Request a Briefing
          </CTAButton>
        </section>
      </main>
    </>
  )
}