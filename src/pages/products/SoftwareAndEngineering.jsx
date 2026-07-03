import ProductPageTemplate from './ProductPageTemplate'

export function SoftwarePage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 03"
      title="Software Systems"
      subtitle="Command, control, and data management software for critical defence and industrial operations."
      heroVideo="/Drone1.mp4"
      description="Vayuron Software Systems delivers mission-critical software infrastructure — from ground control stations and C2 platforms to data pipelines and operational dashboards. Built for high-availability, air-gapped environments with zero dependence on third-party cloud infrastructure."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'Software Systems' }]}
      specs={[
        { label: 'Uptime SLA',    value: '99.99%' },
        { label: 'Latency',       value: '<5 ms' },
        { label: 'Air-Gap Ready', value: 'Yes' },
        { label: 'Encryption',    value: 'AES-256' },
        { label: 'Deployment',    value: 'On-Premise' },
        { label: 'API',           value: 'REST/gRPC' },
        { label: 'OS Support',    value: 'Linux/Win' },
        { label: 'Users',         value: 'Unlimited' },
      ]}
      features={[
        { title: 'Ground Control Station', description: 'Full-featured GCS software for UAV fleet management, mission planning, telemetry monitoring, and payload control.' },
        { title: 'Mission Planning Suite', description: 'Advanced route planning with terrain analysis, threat overlay, and multi-platform mission deconfliction tools.' },
        { title: 'Operational Dashboards', description: 'Real-time situational awareness displays aggregating sensor feeds, mission status, and asset tracking data.' },
        { title: 'Secure Communications', description: 'End-to-end encrypted messaging, command channels, and audit-logged data transfer for classified environments.' },
        { title: 'Integration APIs', description: 'Open API architecture for integration with existing defence information systems, radar networks, and sensor arrays.' },
        { title: 'Maintenance Intelligence', description: 'Predictive maintenance analytics using platform telemetry to schedule servicing before failures occur.' },
      ]}
      nextProduct={{ label: 'Advanced Engineering', path: '/products/advanced-engineering' }}
    />
  )
}

export function EngineeringPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 04"
      title="Advanced Engineering"
      subtitle="Precision manufacturing and systems integration for aerospace, defence, and industrial applications."
      heroVideo="/Drone1.mp4"
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
        { title: 'Composite Structures', description: 'Carbon fibre reinforced polymer airframes and structural components manufactured to aerospace tolerances.' },
        { title: 'Systems Integration', description: 'Full subsystem integration — avionics, propulsion, payload, and communications — tested as a unified platform.' },
        { title: 'Environmental Testing', description: 'MIL-STD-810 environmental testing for vibration, shock, humidity, altitude, and temperature extremes.' },
        { title: 'Precision Fabrication', description: 'CNC machining, 3D metal printing, and precision sheet metal fabrication for complex geometry components.' },
        { title: 'Payload Integration', description: 'Custom payload mounting, gimbal design, and interface electronics for diverse sensor and effector packages.' },
        { title: 'Compliance & Certification', description: 'DGCA, BIS, and export compliance documentation support for defence procurement and regulatory approval.' },
      ]}
      nextProduct={{ label: 'UAV Systems', path: '/products/uav-systems' }}
    />
  )
}

export default SoftwarePage
