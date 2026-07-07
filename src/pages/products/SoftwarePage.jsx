import ProductPageTemplate from './templates/ProductPageTemplate'

export default function SoftwarePage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 03"
      title="Software Systems"
      subtitle="Command, control, and data management software for critical defence and industrial operations."
      heroVideo="/Drone1.mp4"
      backgroundImage="/SS1.png"
      specsBackgroundImage="/SS3.png"
      capabilitiesBackgroundImage="/SS4.png"
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
        { title: 'Ground Control Station', description: 'Full-featured GCS software for UAV fleet management, mission planning, telemetry monitoring, and payload control.', bullets: ['Fleet management', 'Live telemetry monitoring'] },
        { title: 'Mission Planning Suite', description: 'Advanced route planning with terrain analysis, threat overlay, and multi-platform mission deconfliction tools.', bullets: ['Terrain & threat overlay', 'Multi-platform deconfliction'] },
        { title: 'Operational Dashboards', description: 'Real-time situational awareness displays aggregating sensor feeds, mission status, and asset tracking data.', bullets: ['Aggregated sensor feeds', 'Live asset tracking'] },
        { title: 'Secure Communications', description: 'End-to-end encrypted messaging, command channels, and audit-logged data transfer for classified environments.', bullets: ['End-to-end encryption', 'Audit-logged transfers'] },
        { title: 'Integration APIs', description: 'Open API architecture for integration with existing defence information systems, radar networks, and sensor arrays.', bullets: ['Open API architecture', 'Radar & sensor integration'] },
        { title: 'Maintenance Intelligence', description: 'Predictive maintenance analytics using platform telemetry to schedule servicing before failures occur.', bullets: ['Predictive scheduling', 'Telemetry-driven analytics'] },
      ]}
      nextProduct={{ label: 'Advanced Engineering', path: '/products/advanced-engineering' }}
    />
  )
}
