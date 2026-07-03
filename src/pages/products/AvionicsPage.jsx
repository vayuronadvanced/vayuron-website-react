import ProductPageTemplate from './ProductPageTemplate'

export default function AvionicsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 05"
      title="Avionics"
      subtitle="Mission-critical avionics, flight control electronics, navigation, and onboard mission systems engineered for defence and aerospace platforms."
      backgroundImage="/AvionicsBanner.png"
      contentBackgroundImage="/AvionicsBG.png"
      heroVideo="/Drone1.mp4"
      description="Vayuron's Avionics division develops indigenous flight computers, navigation systems, mission controllers, power distribution units, and embedded electronics that enable reliable autonomous operation in demanding defence and industrial environments."

      crumbs={[
        { label: 'Products', path: '/products' },
        { label: 'Avionics' }
      ]}

      specs={[
        { label: 'Processor', value: 'ARM Cortex' },
        { label: 'Navigation', value: 'GPS + INS' },
        { label: 'Protocols', value: 'CAN/UART' },
        { label: 'Power', value: '12–48V' },
        { label: 'Reliability', value: '99.9%' },
        { label: 'Operating Temp', value: '-40°C to +85°C' },
        { label: 'Encryption', value: 'AES-256' },
        { label: 'Certification', value: 'MIL Ready' },
      ]}

      features={[
        {
          title: 'Flight Control Computers',
          description:
            'High-reliability embedded flight controllers supporting autonomous missions and manual override.',
        },
        {
          title: 'Navigation Systems',
          description:
            'GPS, INS and sensor fusion for precise positioning in challenging environments.',
        },
        {
          title: 'Power Management',
          description:
            'Redundant power distribution systems with intelligent battery monitoring.',
        },
        {
          title: 'Mission Computers',
          description:
            'Onboard processors handling navigation, payload management and mission execution.',
        },
        {
          title: 'Communication Modules',
          description:
            'Encrypted radio and telemetry interfaces for secure command and control.',
        },
        {
          title: 'Embedded Electronics',
          description:
            'Custom-designed avionics hardware engineered for defence-grade reliability.',
        },
      ]}

      nextProduct={{
        label: 'Carbon & Composite',
        path: '/products/carbon-composite'
      }}
    />
  )
}