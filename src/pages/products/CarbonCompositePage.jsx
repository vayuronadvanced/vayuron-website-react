import ProductPageTemplate from './ProductPageTemplate'

export default function CarbonCompositePage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 06"
      title="Carbon & Composite"
      subtitle="Lightweight, high-strength carbon fibre and advanced composite structures engineered for aerospace, defence, and industrial applications."
      heroVideo="/Product6.mp4"
      backgroundImage="/Product6-Banner.png"
      specsBackgroundImage="/Product6-Specs.png"
      capabilitiesBackgroundImage="/Product6-Capabilities.png"
      description="Vayuron's Carbon & Composite division develops advanced composite structures, lightweight airframes, payload enclosures, and custom-engineered carbon fibre components. Our manufacturing combines precision engineering with high-performance composite materials to deliver exceptional strength, reduced weight, and long-term durability for mission-critical systems."
      crumbs={[{ label: 'Products', path: '/products' }, { label: 'Carbon & Composite' }]}
      specs={[
        { label: 'Material',          value: 'Carbon Fibre / CFRP' },
        { label: 'Layup Method',      value: 'Hand Layup / Infusion' },
        { label: 'Weight Reduction',  value: 'Up to 40%' },
        { label: 'Tensile Strength',  value: 'High-Modulus' },
        { label: 'Cure Process',      value: 'Autoclave/Oven' },
        { label: 'Tolerance',         value: '±0.1 mm' },
        { label: 'Surface Finish',    value: 'Aerospace-Grade' },
        { label: 'Testing',           value: 'NDT Verified' },
      ]}
      features={[
        { title: 'Composite Structure Design', description: 'Structural design and optimization of lightweight carbon fibre components.', bullets: ['Lightweight engineering solutions', 'Structural optimization'] },
        { title: 'Advanced Material Engineering', description: 'Selection and engineering of carbon, glass, and hybrid composite materials for mission needs.', bullets: ['Carbon fiber composites', 'Hybrid composite materials'] },
        { title: 'Tooling & Mold Development', description: 'Custom mold and tooling development supporting production and prototyping.', bullets: ['Composite mold design', 'Prototype tooling'] },
        { title: 'Composite Manufacturing', description: 'Hand layup, vacuum bagging, and resin infusion processes for precision manufacturing.', bullets: ['Vacuum bagging', 'Resin infusion techniques'] },
        { title: 'Testing & Quality Assurance', description: 'Rigorous inspection and structural evaluation ensuring manufacturing quality.', bullets: ['Composite part inspection', 'Structural evaluation'] },
        { title: 'Manufacturing Expertise', description: 'Precision curing, finishing, and structural bonding across every composite build.', bullets: ['Controlled curing processes', 'Structural bonding'] },
      ]}
      nextProduct={{ label: 'UAV Systems', path: '/products/uav-systems' }}
    />
  )
}
