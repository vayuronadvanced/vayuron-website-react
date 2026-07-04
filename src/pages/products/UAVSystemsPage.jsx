import ProductPageTemplate from './ProductPageTemplate'

export default function UAVSystemsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 01"
      title="UAV Systems"
      subtitle="Autonomous unmanned aerial systems engineered for defence, surveillance, and civilian missions."
      backgroundImage="/Quadcopter.png"  // Hero Section
      heroVideo="/Drone1.mp4"            // 2nd Section
      description="Vayuron's UAV Systems division designs and manufactures a comprehensive range of unmanned aerial vehicles — from tactical reconnaissance drones to heavy-lift autonomous platforms. Each system is built around indigenous technology, ensuring full operational sovereignty and deep customisation for mission-specific requirements."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'UAV Systems' }]}

      // ── Section 3: Ghost Stalker ──
      specsBackgroundImage="/Product1-GhostStalker.png"  
      specsEyebrow="Platform Profile"  
      specsTitle="Ghost Stalker"
      specsDescription="Ghost Stalker is a vertical-takeoff tactical UAV built for rapid, infrastructure-free deployment in constrained environments."
      specs={[
        { label: 'Max Endurance',      value: '90 min' },
        { label: 'Operational Radius', value: '50 km' },
        { label: 'Cruise Speed',       value: '60–80 km/h' },
        { label: 'Max Speed',          value: '120 km/h' },
        { label: 'Payload Capacity',   value: '5 kg' },
        { label: 'Takeoff Method',     value: 'VTOL' },
        { label: 'Comm. Range',        value: '20 km' },
      ]}
      specsMoreDetailsHref="/documents/Ghost Stalker.pdf"

      // ── Section 4: AGNI — FPV Tactical Strike UAV ──
      secondaryBackgroundImage="/Product2-Agni.png"
      secondaryEyebrow="Platform Profile"
      secondaryTitle="AGNI — FPV Tactical Strike UAV"
      secondaryDescription=" AGNI is a tactical FPV strike platform engineered for precision terminal engagement and high-speed final attacks exceeding 200 km/h."
      secondarySpecs={[
        { label: 'Terminal Attack Speed', value: '200+ km/h' },
        { label: 'Max Speed',             value: '180 km/h' },
        { label: 'Cruise Speed',          value: '90–120 km/h' },
        { label: 'Operational Radius',    value: '35 km' },
        { label: 'Max Payload',           value: '1.5 kg' },
        { label: 'Endurance',             value: '25 min' },
        { label: 'Guidance',              value: 'AI-Assisted Targeting' },
      ]}
      secondaryMoreDetailsHref="/documents/AGNI FPV Tactical Strike UAV.pdf"

      nextProduct={{ label: 'Artificial Intelligence', path: '/products/artificial-intelligence' }}
    />
  )
}
