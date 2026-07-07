{/*AdvancedEngineeringPage*/}

import ProductPageTemplate from './templates/ProductPageTemplate'

export default function EngineeringPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 04"
      title="Advanced Engineering"
      subtitle="Precision manufacturing and systems integration for aerospace, defence, and industrial applications."
      heroVideo="/Drone1.mp4"
      backgroundImage="/AE1.png"
      specsBackgroundImage="/AE2.png"
      capabilitiesBackgroundImage="/AE3.png"
      description="Vayuron's Advanced Engineering division provides end-to-end systems integration, precision fabrication, and mechanical design services. From composite airframe structures to ruggedised electronic enclosures and field deployment packages, we engineer hardware that performs in the most demanding environments on earth."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'Advanced Engineering' }]}
      specs={[
        { label: 'Tolerance',      value: '±0.01 mm' },
        { label: 'Materials',      value: 'CFRP/Ti/Al' },
        { label: 'IP Rating',      value: 'IP68' },
        { label: 'Temp Range',     value: '-40°C to +85°C' },
        { label: 'Certifications', value: 'DGCA / BIS' },
        { label: 'Capacity',       value: '50 units/mo' },
        { label: 'Lead Time',      value: '8-12 Weeks' },
        { label: 'Testing',        value: 'MIL-STD-810' },
      ]}
      features={[
        { title: 'Composite Structures', description: 'Carbon fibre reinforced polymer airframes and structural components manufactured to aerospace tolerances.', bullets: ['Aerospace-grade tolerances', 'CFRP airframe structures'] },
        { title: 'Systems Integration', description: 'Full subsystem integration — avionics, propulsion, payload, and communications — tested as a unified platform.', bullets: ['Unified platform testing', 'Avionics-to-payload integration'] },
        { title: 'Environmental Testing', description: 'MIL-STD-810 environmental testing for vibration, shock, humidity, altitude, and temperature extremes.', bullets: ['MIL-STD-810 certified', 'Extreme-condition validated'] },
        { title: 'Precision Fabrication', description: 'CNC machining, 3D metal printing, and precision sheet metal fabrication for complex geometry components.', bullets: ['CNC & 3D metal printing', 'Complex geometry capable'] },
        { title: 'Payload Integration', description: 'Custom payload mounting, gimbal design, and interface electronics for diverse sensor and effector packages.', bullets: ['Custom gimbal design', 'Sensor & effector interfaces'] },
        { title: 'Compliance & Certification', description: 'DGCA, BIS, and export compliance documentation support for defence procurement and regulatory approval.', bullets: ['DGCA & BIS documentation', 'Export compliance support'] },
      ]}
      nextProduct={{ label: 'UAV Systems', path: '/products/uav-systems' }}
    />
  )
}
