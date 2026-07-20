{/*siteData.js*/ }

// ─── Central Site Configuration ───────────────────────────────────────────
// Replaces config/site-config.js from the original HTML project

export const SITE = {
  name: 'Vayuron Advanced Systems',
  tagline: 'Vayuron Advanced Systems',
  email: 'info@vayuronadvancedsystems.com',
  phone: '+91 7554582442',
  phoneTel: '+91 7554582442',
  instagram: 'https://www.instagram.com/vayuron.advanced.systms?igsh=MWF4ZWRzdW53cWd0Nw==', // update with real URL
  linkedin: 'https://www.linkedin.com/company/vaayu-robotics/',   // update with real URL
  x: 'https://x.com/VayuronUAV',
  url: 'https://vayuronadvancedsystems.com',
  // ── Address (SEO Phase 4 — LocalBusiness schema) ──────────────────────
  // Left blank deliberately: not invented, not pulled from anywhere else in
  // this codebase. Fill these in and OrganizationSchema.jsx will pick them
  // up automatically (see the streetAddress-conditional there) to emit full
  // LocalBusiness/PostalAddress markup instead of the bare Organization
  // schema it emits today.
  address: {
    streetAddress: '',   // e.g. '47 Balaji Nagar, Ayodhya Bypass'
    addressLocality: '', // e.g. 'Bhopal'
    addressRegion: '',   // e.g. 'Madhya Pradesh'
    postalCode: '',
    addressCountry: 'IN',
  },
}

export const NAV_LINKS = [
  { label: 'Products', path: '/products', hasDropdown: true },
  { label: 'Sectors', path: '/sectors', hasDropdown: true },
  { label: 'Technology', path: '/technology' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

// Only 4 products remain visible site-wide: UAV Systems, MVTX, Artificial
// Intelligence, and Advanced Engineering. Software Systems, Avionics, and
// Carbon & Composite have been retired — Avionics' content now lives inside
// the Advanced Engineering page (see pages/products/EngineeringPage.jsx).
// This array is the single source of truth for the Navbar dropdown, the
// Footer product links, the Homepage product grid, and the /products page —
// updating it here cascades everywhere automatically.
export const PRODUCTS = [
  {
    id: 'uav-systems',
    label: 'UAV Systems',
    path: '/products/uav-systems',
    description: 'Autonomous fixed-wing, rotary, and hybrid VTOL platforms for defence and industrial missions.',
    bullets: [
      'Autonomous flight & navigation',
      'Multi-mission payload support',
    ],
  },
  {
    id: 'mvtx',
    label: 'MVTX',
    path: '/products/mvtx',
    description: 'Advanced video transmission systems delivering secure, ultra-low latency communication for defence and tactical UAV operations.',
    bullets: [
      'Ultra-low latency transmission',
      'Secure long-range video links',
    ],
  },
  {
    id: 'artificial-intelligence',
    label: 'Artificial Intelligence',
    path: '/products/artificial-intelligence',
    description: 'Edge-deployed AI models delivering real-time inference without cloud connectivity.',
    bullets: [
      'Real-time edge inference',
      'Multi-sensor data fusion',
    ],
  },
  {
    id: 'advanced-engineering',
    label: 'Advanced Engineering',
    path: '/products/advanced-engineering',
    description: 'Structural design, precision manufacturing, and indigenous avionics engineered for demanding operational environments.',
    bullets: [
      'CFRP structural fabrication',
      'Flight control & avionics systems',
    ],
  },
]

export const SECTORS = [
  {
    id: 'defence-homeland-security', label: 'Defence & Security', path: '/sectors/defence-homeland-security',
    description: 'Strategic ISR, border protection, and tactical mission support for defence and security forces.',
  },
  {
    id: 'government-smart-infrastructure', label: 'Government & Smart Infrastructure', path: '/sectors/government-smart-infrastructure',
    description: 'Urban intelligence, disaster response, and public asset inspection for government agencies.',
  },
  {
    id: 'energy-industrial-critical-infrastructure', label: 'Energy, Industrial & Critical Infrastructure', path: '/sectors/energy-industrial-critical-infrastructure',
    description: 'Autonomous inspection for power grids, renewables, pipelines, and industrial facilities.',
  },
  {
    id: 'agriculture-environmental-intelligence', label: 'Agriculture & Environmental Intelligence', path: '/sectors/agriculture-environmental-intelligence',
    description: 'Precision agriculture, water and forest monitoring, and ecological intelligence platforms.',
  },
  {
    id: 'mining-surveying-research', label: 'Mining, Surveying & Research', path: '/sectors/mining-surveying-research',
    description: 'High-precision survey, 3D mapping, and exploration support for mining and research operations.',
  },
]
export const FOOTER_LINKS = {
  products: PRODUCTS.map(p => ({ label: p.label, path: p.path })),
  sectors: SECTORS.slice(0, 4).map(s => ({ label: s.label, path: s.path })),
  company: [
    { label: 'About', path: '/about' },
    { label: 'Technology', path: '/technology' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/documents/privacy-policy.pdf' },
    { label: 'Terms of Use', path: '/documents/terms-of-use.pdf' },
    { label: 'Cookie Policy', path: '/documents/cookie-policy.pdf' },
    { label: 'Security', path: '/documents/security-policy.pdf' },
  ],
}
