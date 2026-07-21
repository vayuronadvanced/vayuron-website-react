{/*AdvancedEngineeringPage*/ }

import ProductPageTemplate from './templates/ProductPageTemplate'

export default function EngineeringPage() {
  return (
    <ProductPageTemplate
      title="Advanced Engineering"
      subtitle="Precision manufacturing, systems integration, and mission-critical avionics for aerospace, defence, and industrial applications."
      heroVideo="/videos/Drone1.webm"
      backgroundImage="/images/AE1.webp"
      specsBackgroundImage="/images/AE2.webp"
      capabilitiesBackgroundImage="/images/AE3.webp"
      description="Vayuron's Advanced Engineering division provides end-to-end systems integration, precision fabrication, mechanical design, and indigenous avionics development. From composite airframe structures to flight computers, navigation systems, and ruggedised electronic enclosures, we engineer hardware that performs in the most demanding environments on earth."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'Advanced Engineering' }]}
      specs={[
        { label: 'Tolerance', value: '±0.01 mm' },
        { label: 'Materials', value: 'CFRP/Ti/Al' },
        { label: 'IP Rating', value: 'IP68' },
        { label: 'Temp Range', value: '-40°C to +85°C' },
        { label: 'Certifications', value: 'DGCA / BIS / MIL-STD-810' },
        { label: 'Capacity', value: '50 units/mo' },
        { label: 'Lead Time', value: '8-12 Weeks' },
        { label: 'Flight Controller', value: 'Pixhawk-Based' },
        { label: 'Processor', value: 'STM32 / ARM Cortex' },
        { label: 'Comm Protocols', value: 'UART/SPI/I²C/CAN' },
        { label: 'Telemetry Range', value: '15 km' },
        { label: 'GNSS Support', value: 'GPS/GLONASS' },
      ]}
      features={[
        { title: 'Carbon Fibre & Structures', description: 'Carbon fibre reinforced polymer airframes and structural components manufactured to aerospace tolerances.', bullets: ['Aerospace-grade tolerances', 'CFRP airframe structures'] },
        { title: 'Precision Fabrication', description: 'CNC machining, 3D metal printing, and precision sheet metal fabrication for complex geometry components.', bullets: ['CNC & 3D metal printing', 'Complex geometry capable'] },
        { title: 'Flight Control Systems', description: 'Flight controller integration, autopilot development, and autonomous navigation for stable, reliable flight.', bullets: ['Autopilot system development', 'Flight stabilization & control optimization'] },
        { title: 'Navigation & Sensor Fusion', description: 'Precision GNSS, IMU, and sensor fusion for accurate positioning and payload interfacing in demanding conditions.', bullets: ['GNSS/GPS integration', 'Inertial Measurement Units (IMU)'] },
        { title: 'Power & Electrical Systems', description: 'Reliable power distribution, battery management, and embedded electronics engineered for continuous, defence-grade operation.', bullets: ['Battery Management Systems (BMS)', 'Custom embedded controllers'] },
        { title: 'Systems Integration & Testing', description: 'Full subsystem integration — avionics, propulsion, payload, and communications — validated under MIL-STD-810 environmental testing.', bullets: ['Unified platform testing', 'MIL-STD-810 certified'] },
        { title: 'Payload & Comms Integration', description: 'Custom payload mounting, gimbal design, telemetry links, and ground control station connectivity for diverse mission packages.', bullets: ['Custom gimbal design', 'Telemetry & GCS connectivity'] },
        { title: 'Compliance & Certification', description: 'DGCA, BIS, and export compliance documentation support for defence procurement and regulatory approval.', bullets: ['DGCA & BIS documentation', 'Export compliance support'] },
      ]}
      nextProduct={{ label: 'UAV Systems', path: '/products/uav-systems' }}
    />
  )
}
