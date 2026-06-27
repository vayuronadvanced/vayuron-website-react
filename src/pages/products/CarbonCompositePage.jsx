import ProductPageTemplate from './ProductPageTemplate'

export default function CarbonCompositePage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 06"
      title="Carbon & Composite"
      subtitle="Lightweight, high-strength carbon fibre and advanced composite structures engineered for aerospace, defence, and industrial applications."
      backgroundImage="/CarbonBanner.png"
      contentBackgroundImage="/CarbonBG.png"
      description="Vayuron's Carbon & Composite division develops advanced composite structures, lightweight airframes, payload enclosures, and custom-engineered carbon fibre components. Our manufacturing combines precision engineering with high-performance composite materials to deliver exceptional strength, reduced weight, and long-term durability for mission-critical systems."

      crumbs={[
        { label: 'Products', path: '/products' },
        { label: 'Carbon & Composite' },
      ]}

      specs={[
        { label: 'Material', value: 'Carbon Fibre' },
        { label: 'Weight Saving', value: 'Up to 60%' },
        { label: 'Strength', value: 'High Impact' },
        { label: 'Finish', value: 'Aerospace Grade' },
        { label: 'Manufacturing', value: 'In-House' },
        { label: 'Precision', value: '±0.2 mm' },
        { label: 'Applications', value: 'Defence' },
        { label: 'Customisation', value: '100%' },
      ]}

      features={[
        {
          icon: '✈',
          title: 'Lightweight Airframes',
          description:
            'Carbon fibre airframes engineered for maximum structural strength with minimal weight.'
        },
        {
          icon: '🛡',
          title: 'Defence Structures',
          description:
            'Composite components designed for demanding military and security applications.'
        },
        {
          icon: '⚙',
          title: 'Custom Manufacturing',
          description:
            'Precision manufacturing of mission-specific carbon fibre and composite assemblies.'
        },
        {
          icon: '📦',
          title: 'Payload Enclosures',
          description:
            'Lightweight protective housings for avionics, sensors, batteries, and mission payloads.'
        },
        {
          icon: '🔬',
          title: 'Advanced Materials',
          description:
            'Use of aerospace-grade composite materials for superior durability and performance.'
        },
        {
          icon: '🏭',
          title: 'Rapid Prototyping',
          description:
            'Fast design, prototyping, and production for defence and industrial programmes.'
        },
      ]}

      nextProduct={{
        label: 'UAV Systems',
        path: '/products/uav-systems',
      }}
    />
  )
}