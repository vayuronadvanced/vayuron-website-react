{/*DroneModelPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton } from '../../components/ui'
import StackSection from '../../components/sections/StackSection'

const DRONES = [
  {
    id: 'interceptor',
    label: 'Interceptor',
    tagline: 'High-Speed Counter-Drone Platform',
    description: 'Rapid-response intercept platform built to neutralise hostile aerial threats within seconds of detection.',
    bullets: ['Neutralises threats in seconds', 'High-speed intercept profile'],
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
    bullets: ['Vertical take-off capable', 'Persistent surveillance endurance'],
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
    bullets: ['Compact & agile airframe', 'Low-observable profile'],
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
    bullets: ['Multi-user video relay', 'Coordinated fleet communication'],
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

      {/* Stacked scroll transitions — same pattern as every other page. */}
      <main>
        <StackSection index={0}>
          <PageBanner
            eyebrow="Product Line"
            title="Tactical Drone Models"
            subtitle="Purpose-built unmanned platforms engineered for intercept, surveillance, strike, and communication missions."
            crumbs={[{ label: 'Products', path: '/products' }, { label: 'Tactical Drone Models' }]}
            backgroundImage="/Quadcopter.png"
          /> 
        </StackSection>

        <StackSection index={1}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/DroneModels-Section1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DRONES.map((drone) => (
                  // Same card language as InfoCard (border/radius/hover/heading
                  // font) — kept as bespoke markup here only because this
                  // card has an inline spec grid InfoCard doesn't support.
                  <div
                    key={drone.id}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

                    <p className="font-mono text-[11px] tracking-widest uppercase text-cyan mb-3">
                      {drone.tagline}
                    </p>
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">
                      {drone.label}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors mb-4">
                      {drone.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {drone.bullets.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-white/70 text-[13px] leading-relaxed group-hover:text-white/90 transition-colors"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-auto">
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
            </div>
          </section>
        </StackSection>

        <StackSection index={2} dim={false}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-center">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/DroneModels-CTA.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 max-w-2xl mx-auto px-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Interested in These Platforms?
              </h2>
              <p className="text-muted mb-8 max-w-xl mx-auto">
                Speak with our engineering team about deployment requirements and mission-specific configurations.
              </p>
              <CTAButton to="/contact" variant="primary">
                Request a Briefing
              </CTAButton>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
