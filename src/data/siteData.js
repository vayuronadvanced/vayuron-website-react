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
  { label: 'Sectors',  path: '/sectors',  hasDropdown: true },
  { label: 'Technology', path: '/technology' },
  { label: 'About',    path: '/about' },
  { label: 'Careers',  path: '/careers' },
  { label: 'Contact',  path: '/contact' },
]

export const PRODUCTS = [
  {
    id: 'uav-systems',
    label: 'UAV Systems',
    path: '/products/uav-systems',
    description: 'Autonomous fixed-wing, rotary, and hybrid VTOL platforms for defence and industrial missions.',
    bullets: [
      'Autonomous flight & navigation',
      'Multi-mission payload support',
      'Comms-denied return-to-home',
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
      'Federated learning pipelines',
    ],
  },
  {
    id: 'software-systems',
    label: 'Software Systems',
    path: '/products/software-systems',
    description: 'Ground control, mission planning, and command-and-control software built in-house.',
    bullets: [
      'Mission planning & GCS suite',
      'Digital twin simulation',
      'Secure C2 backend',
    ],
  },
  {
    id: 'advanced-engineering',
    label: 'Advanced Engineering',
    path: '/products/advanced-engineering',
    description: 'Structural design and manufacturing engineered for demanding operational environments.',
    bullets: [
      'CFRP structural fabrication',
      'Precision CNC machining',
      'Full lifecycle testing',
    ],
  },
  {
    id: 'avionics',
    label: 'Avionics',
    path: '/products/avionics',
    description: 'Flight control and power systems certified for defence-grade reliability.',
    bullets: [
      'Custom flight controllers',
      'Redundant power systems',
      'MIL-STD-810 certified',
    ],
  },
  {
    id: 'carbon-composite',
    label: 'Carbon & Composite',
    path: '/products/carbon-composite',
    description: 'Lightweight, damage-tolerant airframes designed and built entirely in-house.',
    bullets: [
      'Lightweight airframe design',
      'In-house layup & curing',
      'Damage-tolerant structures',
    ],
  }
]

export const SECTORS = [
  {
    id: 'defence-security', label: 'Defence & Security', path: '/sectors/defence-security',
    description: 'ISR and force-protection support for defence and paramilitary operations.',
    bullets: ['Border surveillance', 'Tactical ISR support'],
  },
  {
    id: 'smart-cities', label: 'Smart Cities', path: '/sectors/smart-cities',
    description: 'Urban monitoring and traffic intelligence for modern city operations.',
    bullets: ['Traffic flow analytics', 'Public safety monitoring'],
  },
  {
    id: 'municipal-operations', label: 'Municipal Operations', path: '/sectors/municipal-operations',
    description: 'Aerial inspection and asset tracking for municipal service delivery.',
    bullets: ['Utility asset inspection', 'Waste & sanitation audits'],
  },
  {
    id: 'infrastructure-monitoring', label: 'Infrastructure Monitoring', path: '/sectors/infrastructure-monitoring',
    description: 'Structural inspection of bridges, towers, and critical infrastructure.',
    bullets: ['Structural defect detection', 'Automated inspection routes'],
  },
  {
    id: 'agriculture', label: 'Agriculture', path: '/sectors/agriculture',
    description: 'Precision agriculture platforms for crop health and yield monitoring.',
    bullets: ['Multispectral crop imaging', 'Targeted spraying support'],
  },
  {
    id: 'disaster-management', label: 'Disaster Management', path: '/sectors/disaster-management',
    description: 'Rapid-deployment aerial response for search, rescue, and damage assessment.',
    bullets: ['Search & rescue support', 'Real-time damage mapping'],
  },
  {
    id: 'environmental-monitoring', label: 'Environmental Monitoring', path: '/sectors/environmental-monitoring',
    description: 'Environmental data collection for conservation and compliance monitoring.',
    bullets: ['Air & water quality tracking', 'Wildlife & habitat surveys'],
  },
  {
    id: 'industrial-inspection', label: 'Industrial Inspection', path: '/sectors/industrial-inspection',
    description: 'Autonomous inspection for plants, pipelines, and industrial facilities.',
    bullets: ['Pipeline & flare-stack inspection', 'Thermal anomaly detection'],
  },
]

export const FOOTER_LINKS = {
  products: PRODUCTS.map(p => ({ label: p.label, path: p.path })),
  sectors:  SECTORS.slice(0, 4).map(s => ({ label: s.label, path: s.path })),
  company: [
    { label: 'About',      path: '/about' },
    { label: 'Technology', path: '/technology' },
    { label: 'Careers',    path: '/careers' },
    { label: 'Contact',    path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/legal/privacy' },
    { label: 'Terms of Use',   path: '/legal/terms' },
    { label: 'Cookie Policy',  path: '/legal/cookies' },
    { label: 'Security',       path: '/legal/security' },
  ],
}
