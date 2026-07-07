{/*AvionicsPage*/}

import ProductPageTemplate from './templates/ProductPageTemplate'

export default function AvionicsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 05"
      title="Avionics"
      subtitle="Mission-critical avionics, flight control electronics, navigation, and onboard mission systems engineered for defence and aerospace platforms."
      heroVideo="/Drone1.mp4"
      backgroundImage="/AV1.png"
      specsBackgroundImage="/AV2.png"
      capabilitiesBackgroundImage="/AV3.png"
      description="Vayuron's Avionics division develops indigenous flight computers, navigation systems, mission controllers, power distribution units, and embedded electronics that enable reliable autonomous operation in demanding defence and industrial environments."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'Avionics' }]}
      specs={[
        { label: 'Flight Controller', value: 'Pixhawk-Based' },
        { label: 'Processor',         value: 'STM32 / ARM Cortex' },
        { label: 'Comm Protocols',    value: 'UART/SPI/I²C/CAN' },
        { label: 'Telemetry Range',   value: '15 km' },
        { label: 'Power Input',       value: '12–52V' },
        { label: 'GNSS Support',      value: 'GPS/GLONASS' },
        { label: 'Operating Temp',    value: '-20°C to 60°C' },
        { label: 'Certification',     value: 'MIL-STD-810' },
      ]}
      features={[
        { title: 'Flight Control Systems', description: 'Flight controller integration, autopilot development, and autonomous navigation for stable, reliable flight.', bullets: ['Autopilot system development', 'Flight stabilization & control optimization'] },
        { title: 'Navigation & Positioning', description: 'Precision GNSS, IMU, and sensor fusion for accurate positioning in demanding conditions.', bullets: ['GNSS/GPS integration', 'Inertial Measurement Units (IMU)'] },
        { title: 'Communication Systems', description: 'Robust telemetry and RF communication architecture linking aircraft to ground control.', bullets: ['Telemetry system integration', 'Ground Control Station connectivity'] },
        { title: 'Power & Electrical Systems', description: 'Reliable power distribution and battery management engineered for continuous operation.', bullets: ['Battery Management Systems (BMS)', 'Voltage regulation'] },
        { title: 'Sensor Integration', description: 'Environmental, payload, and imaging sensor interfaces tailored to mission requirements.', bullets: ['Optical and imaging sensor integration', 'Rangefinding systems'] },
        { title: 'Embedded Electronics', description: 'Custom embedded controllers and real-time systems built for defence-grade reliability.', bullets: ['Microcontroller-based avionics solutions', 'Real-time embedded systems'] },
      ]}
      nextProduct={{ label: 'Carbon & Composite', path: '/products/carbon-composite' }}
    />
  )
}
