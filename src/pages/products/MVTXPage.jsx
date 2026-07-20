import ProductPageTemplate from './templates/ProductPageTemplate'

// MVTX is one of the 4 core products in PRODUCTS (data/siteData.js), shown
// in the Navbar dropdown, Footer, Homepage grid, and /products page.
export default function MVTXPage() {
  return (
    <ProductPageTemplate
      eyebrow="Standalone Product"
      title="MVTX"
      subtitle="Multi View Transmission System is a real-time video, complete situational awareness. MVTX connects your ground team to multiple remote views through a simple, secure wireless link."
      // backgroundImage="/MVTX1.jpg"
      heroVideo="/MVTX.mp4"
      // heroPoster="/MVTX1.jpg"
      description="MVTX links a pilot/command station and a UAV over a long-range, encrypted command, telemetry, and video channel, then broadcasts live video to multiple ground users simultaneously — each receiving their own dedicated video-only feed."

      crumbs={[
        { label: 'Products', path: '/products' },
        { label: 'MVTX' },
      ]}

      // ── Mission Profile + Technical Specifications ──
      specsBackgroundImage="/MVTX2.png"
      specsEyebrow="Mission Profile"
      specsTitle="Technical Specifications"
      specsDescription="MVTX is a portable video distribution system enabling simultaneous reception and viewing of live UAV video feeds by multiple operators and decision-makers. Designed for command centers, field units, and tactical operations, MVTX improves situational awareness across distributed teams."
      specs={[
        { label: 'System Type', value: 'Multi-User Video Distribution' },
        { label: 'Video Format', value: 'HD Digital' },
        { label: 'Latency', value: 'Low' },
        { label: 'Frequency Band', value: '5.8 GHz' },
        { label: 'Receiver Support', value: 'Multiple Simultaneous' },
        { label: 'Deployment Time', value: '<5 Minutes' },
        { label: 'Power Source', value: 'Portable Battery' },
        { label: 'Ground Station', value: 'Modular' },
      ]}

      cardSections={[
        // ── Section 1: Key Operational Advantages (title-only cards) ──
        {
          eyebrow: 'Why It Matters',
          title: 'Key Operational Advantages',
          backgroundImage: '/MVTX3.png',
          columns: 3,
          cards: [
            { title: 'Multiple Viewer Access' },
            { title: 'Real-Time Intelligence Sharing' },
            { title: 'Reduced Decision Cycle' },
            { title: 'Portable Deployment' },
            { title: 'No Fixed Infrastructure Required' },
            { title: 'Secure Encrypted Transmission' },
          ],
        },

        // ── Section 2: System Components (title-only cards) ──
        {
          eyebrow: 'What It\u2019s Made Of',
          title: 'System Components',
          backgroundImage: '/MVTX4.png',
          columns: 3,
          cards: [
            { title: 'Transmission Unit' },
            { title: 'Receiving Stations' },
            { title: 'Monitoring Displays' },
            { title: 'Antenna Assembly' },
            { title: 'Portable Power Module' },
            { title: 'Ruggedized Carry Case' },
          ],
        },

        // ── Section 3: Applications (title-only cards) ──
        {
          eyebrow: 'Where It\u2019s Used',
          title: 'Applications',
          backgroundImage: '/ProductPage1.png',
          columns: 3,
          cards: [
            { title: 'UAV Operations' },
            { title: 'Surveillance Missions' },
            { title: 'Command Centers' },
            { title: 'Emergency Response' },
            { title: 'Infrastructure Monitoring' },
            { title: 'Border Security' },
          ],
        },
      ]}

      nextProduct={{ label: 'Artificial Intelligence', path: '/products/artificial-intelligence' }}
    />
  )
}