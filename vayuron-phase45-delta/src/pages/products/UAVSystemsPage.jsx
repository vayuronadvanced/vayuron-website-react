import { Suspense, lazy, useRef } from 'react'
import { useScroll } from '@react-three/drei'
import ProductPageTemplate from './ProductPageTemplate'

const UAVScene = lazy(() => import('../../components/three/scenes/UAVScene'))

const highlights = [
  { part: 'fuselage', label: 'Carbon Fibre Fuselage',  desc: 'CFRP monocoque structure — 480g airframe rated to MIL-STD-810 shock and vibration.' },
  { part: 'rotors',   label: 'Quad-Rotor Array',       desc: 'Four 9-inch variable-pitch rotors with brushless motors. Thrust-to-weight ratio 3.2:1.' },
  { part: 'sensor',   label: 'EO/IR Sensor Payload',   desc: '30x optical zoom EO camera + 640×512 uncooled LWIR thermal imager on 3-axis stabilised gimbal.' },
  { part: 'comms',    label: 'Encrypted Comms Module', desc: 'AES-256 FHSS datalink with 80km operational range and anti-jam frequency agility.' },
]

function UAVVisualization() {
  return (
    <section className="py-24 px-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3D Canvas */}
        <div className="relative h-[420px] bg-surface border border-[rgba(0,212,255,0.1)] overflow-hidden">
          <Suspense fallback={<div className="w-full h-full grid-overlay animate-pulse-slow" />}>
            <UAVScene />
          </Suspense>
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <p className="font-mono text-[10px] text-cyan tracking-widest uppercase mb-1">3D Platform View</p>
            <p className="font-mono text-[10px] text-dim">Click and drag to rotate · Hover components to highlight</p>
          </div>
        </div>

        {/* Component list */}
        <div className="space-y-3">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-4">Platform Components</p>
          {highlights.map((h, i) => (
            <div key={i} className="bg-surface border border-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.35)] p-4 transition-colors group cursor-default">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0 group-hover:animate-pulse" />
                <span className="font-display font-semibold text-white text-sm group-hover:text-cyan transition-colors">{h.label}</span>
              </div>
              <p className="text-muted text-xs leading-relaxed pl-4">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function UAVSystemsPage() {
  return (
    <>
      <ProductPageTemplate
        eyebrow="Product Line 01"
        title="UAV Systems"
        subtitle="Autonomous unmanned aerial systems engineered for defence, surveillance, and civilian missions."
        description="Vayuron's UAV Systems division designs and manufactures a comprehensive range of unmanned aerial vehicles — from tactical reconnaissance drones to heavy-lift autonomous platforms. Each system is built around indigenous technology, ensuring full operational sovereignty and deep customisation for mission-specific requirements."
        crumbs={[{ label: 'Products', path: '/products' }, { label: 'UAV Systems' }]}
        specGroups={[
          {
            label: 'Flight Performance',
            specs: [
              { label: 'Max Altitude',     value: '4,500 m' },
              { label: 'Endurance',        value: '6+ Hours' },
              { label: 'Top Speed',        value: '120 km/h' },
              { label: 'Range',            value: '80 km' },
            ],
          },
          {
            label: 'Payload & Systems',
            specs: [
              { label: 'Payload Capacity', value: '5 kg' },
              { label: 'IP Rating',        value: 'IP67' },
              { label: 'Communication',    value: 'Encrypted' },
              { label: 'Navigation',       value: 'GPS + INS' },
            ],
          },
        ]}
        features={[
          { icon: '🛰', title: 'Multi-Mission Platforms', description: 'Configurable airframes supporting ISR, cargo, EW, and strike missions with quick-change payload interfaces.' },
          { icon: '🤖', title: 'Autonomous Flight',       description: 'AI-driven autopilot with terrain-following, obstacle avoidance, and autonomous RTH under comms-denied conditions.' },
          { icon: '🔐', title: 'Encrypted Datalinks',     description: 'Military-grade encrypted C2 channels with frequency-hopping and anti-jam protection.' },
          { icon: '👁',  title: 'EO/IR Sensor Suite',     description: 'Integrated electro-optical and infrared camera systems with real-time target tracking and geo-tagging.' },
          { icon: '🔋', title: 'Extended Endurance',      description: 'Hybrid propulsion options delivering 6+ hours of flight time on a single charge or fuel load.' },
          { icon: '🌐', title: 'Swarm Coordination',      description: 'Multi-UAV swarm intelligence protocols enabling coordinated missions across distributed platforms.' },
        ]}
        nextProduct={{ label: 'Artificial Intelligence', path: '/products/artificial-intelligence' }}
      />
      <UAVVisualization />
    </>
  )
}
