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
    description: 'Autonomous unmanned aerial systems for defence operations.',
  },
  {
    id: 'artificial-intelligence',
    label: 'Artificial Intelligence',
    path: '/products/artificial-intelligence',
    description: 'Edge AI, computer vision, and intelligent automation.',
  },
  {
    id: 'software-systems',
    label: 'Software Systems',
    path: '/products/software-systems',
    description: 'Mission planning, command, control, and data platforms.',
  },
  {
    id: 'advanced-engineering',
    label: 'Advanced Engineering',
    path: '/products/advanced-engineering',
    description: 'Precision manufacturing and advanced systems integration.',
  },
  {
    id: 'avionics',
    label: 'Avionics',
    path: '/products/avionics',
    description: 'Flight electronics, navigation, and mission systems.',
  },
  {
    id: 'carbon-composite',
    label: 'Carbon & Composite',
    path: '/products/carbon-composite',
    description: 'Lightweight composite structures for aerospace applications.',
  }
]

export const SECTORS = [
  { id: 'defence-security',         label: 'Defence & Security',         path: '/sectors/defence-security' },
  { id: 'smart-cities',             label: 'Smart Cities',               path: '/sectors/smart-cities' },
  { id: 'municipal-operations',     label: 'Municipal Operations',       path: '/sectors/municipal-operations' },
  { id: 'infrastructure-monitoring',label: 'Infrastructure Monitoring',  path: '/sectors/infrastructure-monitoring' },
  { id: 'agriculture',              label: 'Agriculture',                path: '/sectors/agriculture' },
  { id: 'disaster-management',      label: 'Disaster Management',        path: '/sectors/disaster-management' },
  { id: 'environmental-monitoring', label: 'Environmental Monitoring',   path: '/sectors/environmental-monitoring' },
  { id: 'industrial-inspection',    label: 'Industrial Inspection',      path: '/sectors/industrial-inspection' },
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
