# Vayuron Advanced Systems — React Website (Phase 2)

Modern React rebuild of the Vayuron Advanced Systems website.  
Stack: Vite · React 18 · React Router v6 · Framer Motion · Tailwind CSS

---

## Quick Start

### Prerequisites
- Node.js v20 or above → https://nodejs.org
- npm (comes with Node.js)

### Setup

```bash
# 1. Install all dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output goes to /dist folder
```

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
vayuron-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        ← Animated mega-menu navbar
│   │   │   └── Footer.jsx        ← Full footer with links
│   │   ├── ui/
│   │   │   └── index.jsx         ← All reusable UI components
│   │   └── sections/             ← (Phase 3+) Hero sections
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── TechnologyPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── CareersPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── products/
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── UAVSystemsPage.jsx
│   │   │   ├── AIPage.jsx
│   │   │   ├── SoftwarePage.jsx
│   │   │   └── EngineeringPage.jsx
│   │   └── sectors/
│   │       ├── SectorsPage.jsx
│   │       ├── DefencePage.jsx
│   │       ├── SmartCitiesPage.jsx
│   │       ├── MunicipalPage.jsx
│   │       ├── InfrastructurePage.jsx
│   │       ├── AgriculturePage.jsx
│   │       ├── DisasterPage.jsx
│   │       ├── EnvironmentalPage.jsx
│   │       └── IndustrialPage.jsx
│   ├── hooks/
│   │   └── index.js              ← useScrollReveal, useScrollProgress, useCursor, useStatCounter
│   ├── data/
│   │   └── siteData.js           ← Central config: nav, products, sectors, footer
│   ├── styles/
│   │   └── globals.css           ← Tailwind + CSS custom properties
│   ├── App.jsx                   ← Root: all routes + Navbar + Footer
│   └── main.jsx                  ← React entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Products Overview |
| `/products/uav-systems` | UAV Systems |
| `/products/artificial-intelligence` | Artificial Intelligence |
| `/products/software-systems` | Software Systems |
| `/products/advanced-engineering` | Advanced Engineering |
| `/sectors` | Sectors Overview |
| `/sectors/defence-security` | Defence & Security |
| `/sectors/smart-cities` | Smart Cities |
| `/sectors/municipal-operations` | Municipal Operations |
| `/sectors/infrastructure-monitoring` | Infrastructure Monitoring |
| `/sectors/agriculture` | Agriculture |
| `/sectors/disaster-management` | Disaster Management |
| `/sectors/environmental-monitoring` | Environmental Monitoring |
| `/sectors/industrial-inspection` | Industrial Inspection |
| `/technology` | Technology |
| `/about` | About |
| `/careers` | Careers |
| `/contact` | Contact |
| `*` | 404 Not Found |

---

## Design Tokens

| Token | Value |
|---|---|
| `--black` | `#050607` |
| `--surface` | `#0a0c0f` |
| `--cyan` | `#00d4ff` |
| `--text` | `#d8dce4` |
| `--muted` | `#68788a` |

---

## What's in Phase 2

- Vite build system replacing `npx serve`
- React Router with animated page transitions
- Framer Motion page enter/exit animations
- Animated mega-menu navbar (Products + Sectors dropdowns)
- Custom cyan cursor
- Scroll progress bar
- Loading screen (1.6s on first load)
- Scroll reveal animations on all sections
- Animated stat counters
- All 19 routes defined and working
- Central data config (`siteData.js`)
- Full Tailwind design system with your exact colour tokens
- All reusable UI components (PageBanner, FeatureCard, SpecCard, CTAButton, StatCard, SectionHeader, Breadcrumb)

## What comes in Phase 3

- GSAP ScrollTrigger installed and configured
- Cinematic hero section with scroll-linked parallax
- Text reveal animations (letter-by-letter, line-by-line)
- Three.js canvas placeholder in hero (ready for Phase 5 3D scenes)
- Smooth scroll with Lenis

## What comes in Phase 4

- Full component library expansion
- Glitch text effect
- Magnetic button effect  
- Tilt card hover effect
- Timeline/history component for About page
- Case study card grid

## What comes in Phase 5

- React Three Fiber 3D scenes
- UAV drone model in UAV Systems hero
- Radar terrain in Defence & Security hero
- Neural network visualization in AI page
- Post-processing: bloom, chromatic aberration, vignette

---

## Deployment

### Vercel (Recommended)

1. Push this folder to your GitHub repo
2. Go to vercel.com → New Project → Import repo
3. Framework: Vite (auto-detected)
4. Click Deploy

### GitHub Pages

Add to `vite.config.js`:
```js
base: '/Vayuron-Advance-System-Website/',
```
Then run `npm run build` and push `/dist` to `gh-pages` branch.

---

## Contact Form

The contact form in `ContactPage.jsx` currently logs to console.  
To make it live, replace the `handleSubmit` function with one of:
- **Formspree**: `fetch('https://formspree.io/f/YOUR_ID', ...)`
- **EmailJS**: `emailjs.send(...)`
- **Your own API**: `fetch('/api/contact', ...)`
