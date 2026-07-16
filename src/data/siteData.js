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
    id: 'defence-security', label: 'Defence & Security', path: '/sectors/defence-security',
    description: 'ISR and force-protection support for defence and paramilitary operations.',
    // bullets: ['Border surveillance', 'Tactical ISR support'],
  },
  {
    id: 'smart-cities', label: 'Smart Cities', path: '/sectors/smart-cities',
    description: 'Urban monitoring and traffic intelligence for modern city operations.',
    // bullets: ['Traffic flow analytics', 'Public safety monitoring'],
  },
  {
    id: 'municipal-operations', label: 'Municipal Operations', path: '/sectors/municipal-operations',
    description: 'Aerial inspection and asset tracking for municipal service delivery.',
    // bullets: ['Utility asset inspection', 'Waste & sanitation audits'],
  },
  {
    id: 'infrastructure-monitoring', label: 'Infrastructure Monitoring', path: '/sectors/infrastructure-monitoring',
    description: 'Structural inspection of bridges, towers, and critical infrastructure.',
    // bullets: ['Structural defect detection', 'Automated inspection routes'],
  },
  {
    id: 'agriculture', label: 'Agriculture', path: '/sectors/agriculture',
    description: 'Precision agriculture platforms for crop health and yield monitoring.',
    // bullets: ['Multispectral crop imaging', 'Targeted spraying support'],
  },
  {
    id: 'disaster-management', label: 'Disaster Management', path: '/sectors/disaster-management',
    description: 'Rapid-deployment aerial response for search, rescue, and damage assessment.',
    // bullets: ['Search & rescue support', 'Real-time damage mapping'],
  },
  {
    id: 'environmental-monitoring', label: 'Environmental Monitoring', path: '/sectors/environmental-monitoring',
    description: 'Environmental data collection for conservation and compliance monitoring.',
    // bullets: ['Air & water quality tracking', 'Wildlife & habitat surveys'],
  },
  {
    id: 'industrial-inspection', label: 'Industrial Inspection', path: '/sectors/industrial-inspection',
    description: 'Autonomous inspection for plants, pipelines, and industrial facilities.',
    // bullets: ['Pipeline & flare-stack inspection', 'Thermal anomaly detection'],
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
