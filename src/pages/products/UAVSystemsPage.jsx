import ProductPageTemplate from './ProductPageTemplate'

export default function UAVSystemsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 01"
      title="UAV Systems"
      subtitle="Autonomous unmanned aerial systems engineered for defence, surveillance, and civilian missions."
     // backgroundImage="/Quadcopter.png"
      heroVideo="/Drone1.mp4"
      contentBackgroundImage="/ProductPageDroneBigImg.png"
      description="Vayuron's UAV Systems division designs and manufactures a comprehensive range of unmanned aerial vehicles — from tactical reconnaissance drones to heavy-lift autonomous platforms. Each system is built around indigenous technology, ensuring full operational sovereignty and deep customisation for mission-specific requirements."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'UAV Systems' }]}
      specs={[
        { label: 'Max Altitude',     value: '4,500 m' },
        { label: 'Endurance',        value: '6+ Hours' },
        { label: 'Payload Capacity', value: '5 kg' },
        { label: 'Range',            value: '80 km' },
        { label: 'Top Speed',        value: '120 km/h' },
        { label: 'IP Rating',        value: 'IP67' },
        { label: 'Communication',    value: 'Encrypted' },
        { label: 'Navigation',       value: 'GPS + INS' },
      ]}
      features={[
        { title: 'Multi-Mission Platforms', description: 'Configurable airframes supporting ISR, cargo, electronic warfare, and strike missions with quick-change payload interfaces.' },
        { title: 'Autonomous Flight', description: 'AI-driven autopilot with terrain-following, obstacle avoidance, and autonomous return-to-home under comms-denied conditions.' },
        { title: 'Encrypted Datalinks', description: 'Military-grade encrypted command and control channels with frequency-hopping and anti-jam protection.' },
        { title: 'EO/IR Sensor Suite', description: 'Integrated electro-optical and infrared camera systems with real-time target tracking and geo-tagging.' },
        { title: 'Extended Endurance', description: 'Hybrid propulsion options delivering 6+ hours of flight time on a single charge or fuel load.' },
        { title: 'Swarm Coordination', description: 'Multi-UAV swarm intelligence protocols enabling coordinated missions across distributed platforms.' },
      ]}
      nextProduct={{ label: 'Artificial Intelligence', path: '/products/artificial-intelligence' }}
    />
  )
}
