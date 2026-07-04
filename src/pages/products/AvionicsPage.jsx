import ProductPageTemplate from './ProductPageTemplate'

export default function AvionicsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 05"
      title="Avionics"
      subtitle="Mission-critical avionics, flight control electronics, navigation, and onboard mission systems engineered for defence and aerospace platforms."
      backgroundImage="/Product5-Banner.png"
      heroVideo="/Product5.mp4"
      description="Vayuron's Avionics division develops indigenous flight computers, navigation systems, mission controllers, power distribution units, and embedded electronics that enable reliable autonomous operation in demanding defence and industrial environments."

      crumbs={[
        { label: 'Products', path: '/products' },
        { label: 'Avionics' }
      ]}

      cardSections={[
        // ── Section 1: Core Capabilities ──
        {
          eyebrow: 'What We Deliver',
          title: 'Core Capabilities',
          backgroundImage: '/Product5-Section1.png',
          columns: 3,
          cards: [
            {
              title: 'Flight Control Systems',
              bullets: [
                'Flight controller integration and configuration',
                'Autopilot system development',
                'Autonomous navigation systems',
                'Flight stabilization and control optimization',
              ],
            },
            {
              title: 'Navigation & Positioning',
              bullets: [
                'GNSS/GPS integration',
                'Inertial Measurement Units (IMU)',
                'Magnetometer integration',
                'Barometric altitude sensing',
              ],
            },
            {
              title: 'Communication Systems',
              bullets: [
                'Telemetry system integration',
                'RF communication systems',
                'Ground Control Station connectivity',
                'Long-range communication architecture',
              ],
            },
            {
              title: 'Power & Electrical Systems',
              bullets: [
                'Power distribution system design',
                'Battery Management Systems (BMS)',
                'Voltage regulation',
                'Power monitoring solutions',
              ],
            },
            {
              title: 'Sensor Integration',
              bullets: [
                'Environmental sensors',
                'Payload sensor interfaces',
                'Optical and imaging sensor integration',
                'Rangefinding systems',
              ],
            },
            {
              title: 'Embedded Electronics',
              bullets: [
                'Embedded controller integration',
                'Microcontroller-based avionics solutions',
                'Interface electronics',
                'Real-time embedded systems',
              ],
            },
          ],
        },

        // ── Section 2: Engineering Services (top 6 only) ──
        {
          eyebrow: 'How We Work',
          title: 'Engineering Services',
          backgroundImage: '/Product5-Section2.png',
          columns: 3,
          cards: [
            { title: 'Avionics system architecture design' },
            { title: 'Flight controller integration' },
            { title: 'Electrical wiring and harness development' },
            { title: 'PCB integration and testing' },
            { title: 'Communication system setup' },
            { title: 'Sensor calibration' },
          ],
        },

        // ── Section 3: Technology Expertise (top 6, with description + More Details) ──
        {
          eyebrow: 'What We Work With',
          title: 'Technology Expertise',
          backgroundImage: '/Product5-Section3.png',
          columns: 3,
          moreDetailsHref: '/documents/avionics-technology-overview.pdf',
          moreDetailsLabel: 'More Details',
          cards: [
            {
              title: 'Pixhawk Flight Controllers',
              description: 'Industry-standard open-hardware flight controllers used across our autonomous UAV platforms.',
            },
            {
              title: 'ArduPilot / PX4 Autopilot',
              description: 'Open-source autopilot firmware customised for mission-specific flight behaviour and control.',
            },
            {
              title: 'Mission Planner / QGroundControl',
              description: 'Ground control software for mission planning, telemetry monitoring, and in-flight parameter tuning.',
            },
            {
              title: 'STM32 Microcontrollers',
              description: 'High-performance embedded microcontrollers powering custom avionics and sensor interface boards.',
            },
            {
              title: 'Arduino / ESP32 Platforms',
              description: 'Rapid-prototyping microcontroller platforms used for sensor integration and embedded testing.',
            },
            {
              title: 'Communication Protocols',
              description: 'UART, SPI, I²C, and CAN Bus protocols enabling reliable data exchange between onboard avionics components.',
            },
          ],
        },
      ]}

      nextProduct={{
        label: 'Carbon & Composite',
        path: '/products/carbon-composite'
      }}
    />
  )
}
