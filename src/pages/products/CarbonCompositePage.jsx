import ProductPageTemplate from './ProductPageTemplate'

export default function CarbonCompositePage() {
  return (
    <ProductPageTemplate
      eyebrow="Product Line 06"
      title="Carbon & Composite"
      subtitle="Lightweight, high-strength carbon fibre and advanced composite structures engineered for aerospace, defence, and industrial applications."
      backgroundImage="/Product6-Banner.png"
      heroVideo="/Product6.mp4"
      description="Vayuron's Carbon & Composite division develops advanced composite structures, lightweight airframes, payload enclosures, and custom-engineered carbon fibre components. Our manufacturing combines precision engineering with high-performance composite materials to deliver exceptional strength, reduced weight, and long-term durability for mission-critical systems."

      crumbs={[
        { label: 'Products', path: '/products' },
        { label: 'Carbon & Composite' },
      ]}

      cardSections={[
        // ── Section 1: Core Capabilities ──
        {
          eyebrow: 'What We Deliver',
          title: 'Core Capabilities',
          backgroundImage: '/Product6-Section1.png',
          columns: 3,
          cards: [
            {
              title: 'Composite Structure Design',
              bullets: [
                'Carbon fiber structural component design',
                'Lightweight engineering solutions',
                'Structural optimization',
                'Composite part development',
              ],
            },
            {
              title: 'Advanced Material Engineering',
              bullets: [
                'Carbon fiber composites',
                'Glass fiber composites',
                'Hybrid composite materials',
                'Polymer matrix composites',
              ],
            },
            {
              title: 'Tooling & Mold Development',
              bullets: [
                'Composite mold design',
                'Tooling development',
                'Production fixture design',
                'Prototype tooling',
              ],
            },
            {
              title: 'Composite Manufacturing',
              bullets: [
                'Hand layup processes',
                'Vacuum bagging',
                'Resin infusion techniques',
                'Lamination processes',
              ],
            },
            {
              title: 'Testing & Quality Assurance',
              bullets: [
                'Composite part inspection',
                'Dimensional verification',
                'Structural evaluation',
                'Manufacturing quality control',
              ],
            },
          ],
        },

        // ── Section 2: Engineering Services (top 6 only) ──
        {
          eyebrow: 'How We Work',
          title: 'Engineering Services',
          backgroundImage: '/Product6-Section2.png',
          columns: 3,
          cards: [
            { title: 'Composite component design' },
            { title: 'Material selection and optimization' },
            { title: 'Structural analysis support' },
            { title: 'Mold and tooling development' },
            { title: 'Composite manufacturing process planning' },
            { title: 'Prototype fabrication' },
          ],
        },

        // ── Section 3: Manufacturing Expertise (top 6, with description) ──
        {
          eyebrow: 'What We Work With',
          title: 'Manufacturing Expertise',
          backgroundImage: '/Product6-Section3.png',
          columns: 3,
          cards: [
            {
              title: 'Hand Layup Manufacturing',
              description: 'Precision hand layup of carbon fibre plies for custom structural components.',
            },
            {
              title: 'Vacuum Bagging',
              description: 'Vacuum-bagged consolidation ensuring uniform resin distribution and void-free laminates.',
            },
            {
              title: 'Resin Infusion',
              description: 'Controlled resin infusion for high-strength, weight-optimised composite structures.',
            },
            {
              title: 'Controlled Curing Processes',
              description: 'Temperature and pressure-controlled curing cycles for consistent material properties.',
            },
            {
              title: 'Surface Finishing',
              description: 'Precision surface finishing for aerodynamic quality and paint-ready composite parts.',
            },
            {
              title: 'Structural Bonding',
              description: 'Structural adhesive bonding for multi-part composite assemblies and joints.',
            },
          ],
        },
      ]}

      nextProduct={{
        label: 'UAV Systems',
        path: '/products/uav-systems',
      }}
    />
  )
}
