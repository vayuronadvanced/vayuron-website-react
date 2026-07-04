import ProductPageTemplate from './templates/ProductPageTemplate'

// NOTE: MVTX is intentionally NOT added to PRODUCTS in siteData.js.
// This keeps it out of the homepage Products preview, the /products
// index grid, and any other place that maps over PRODUCTS — it's a
// standalone page, reachable only via its direct route and the
// dedicated navbar link.
export default function MVTXPage() {
  return (
    <ProductPageTemplate
      eyebrow="Standalone Product"
      title="MVTX — Multi View Transmission System"
      subtitle="Real-time video, complete situational awareness. MVTX connects your ground team to multiple remote views through a simple, secure wireless link."
      backgroundImage="/MVTX-Banner.png"
      description="MVTX links a pilot/command station and a UAV over a long-range, encrypted command, telemetry, and video channel, then broadcasts live video to multiple ground users simultaneously — each receiving their own dedicated video-only feed."

      crumbs={[
        { label: 'Products', path: '/products' },
        { label: 'MVTX' },
      ]}

      cardSections={[
        // ── Section 1: Core Capabilities ──
        {
          eyebrow: 'What It Does',
          title: 'Core Capabilities',
          backgroundImage: '/MVTX-Section1.png',
          columns: 2,
          cards: [
            {
              title: 'Command & Control',
              bullets: [
                'Mission control and management',
                'Live telemetry and drone status',
                'Multi-view live video feed',
              ],
            },
            {
              title: 'Secure Long-Range Link',
              bullets: [
                'Long-range wireless transmission',
                'Encrypted command, telemetry & video channel',
                'Resistant to interference in contested environments',
              ],
            },
            {
              title: 'Multi-User Video Broadcast',
              bullets: [
                'Simultaneous video feed to multiple ground users',
                'Dedicated video-only channel per user',
                'Scalable to an entire ground team',
              ],
            },
            {
              title: 'Ground User Terminal',
              bullets: [
                'Compact, portable receiver hardware',
                'Real-time video-only reception',
                'Field-ready ergonomic design',
              ],
            },
          ],
        },

        // ── Section 2: Key Features (title-only cards) ──
        {
          eyebrow: 'Built For The Field',
          title: 'Key Features',
          backgroundImage: '/MVTX-Section2.png',
          columns: 3,
          cards: [
            { title: 'Multi View' },
            { title: 'Wireless Transmission' },
            { title: 'Secure & Encrypted' },
            { title: 'Portable & Rugged' },
            { title: 'Long-Range Connectivity' },
            { title: 'Real-Time Video Feed' },
          ],
        },

        // ── Section 3: Mission Benefits (cards with description) ──
        {
          eyebrow: 'Why It Matters',
          title: 'Mission Benefits',
          backgroundImage: '/MVTX-Section3.png',
          columns: 3,
          cards: [
            {
              title: 'Enhanced Awareness',
              description: 'Multiple simultaneous viewpoints give ground teams richer situational data for better decisions.',
            },
            {
              title: 'Team Coordination',
              description: 'Live video is shared instantly with every operator on the ground, keeping the whole team aligned.',
            },
            {
              title: 'Faster Response',
              description: 'See it, know it, act on it — reduced observation-to-action time in the field.',
            },
            {
              title: 'Mission Ready',
              description: 'Built and hardened for real-world, mission-critical operations.',
            },
          ],
        },
      ]}
    />
  )
}
