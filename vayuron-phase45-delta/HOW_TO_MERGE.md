# Vayuron — Phase 4 Completion + Phase 5 Delta
## Only 17 files. Apply on top of your existing repo.

---

## Step 1 — Install new package

```bash
npm install @react-three/postprocessing postprocessing
```

---

## Step 2 — Copy files into your repo at the same paths

### NEW files (Phase 5 — 3D Scenes + PostProcessing):
```
src/components/three/PostProcessing.jsx              ← Bloom, chromatic aberration, vignette effects
src/components/three/scenes/UAVScene.jsx             ← Rotating drone wireframe 3D model
src/components/three/scenes/NeuralNetworkScene.jsx   ← Animated neural network visualization
src/components/three/scenes/RadarTerrainScene.jsx    ← Pulsing radar terrain with target markers
src/components/three/scenes/CityAndInfraScene.jsx    ← Smart city drone paths + pipeline thermal
```

### MODIFIED files (Phase 4 completion — pages rebuilt):
```
src/pages/AboutPage.jsx                              ← Timeline, HUDFrame, MagneticButton, ScrollStory
src/pages/TechnologyPage.jsx                         ← TerminalBlock, HUDFrame, FeatureCardEnhanced
src/pages/CareersPage.jsx                            ← Accordion roles, HUDFrame, MagneticButton
src/pages/products/ProductPageTemplate.jsx           ← SpecAccordion, HUDFrame, MagneticButton
src/pages/products/UAVSystemsPage.jsx                ← Embedded UAVScene 3D visualization
src/pages/products/AIPage.jsx                        ← Embedded NeuralNetworkScene 3D visualization
src/pages/products/SoftwareAndEngineering.jsx        ← Updated to SpecAccordion Phase 4 format
src/pages/sectors/SectorPageTemplate.jsx             ← FeatureCardEnhanced, HUDFrame, MagneticButton
src/pages/sectors/AllSectors.jsx                     ← DefencePage+RadarTerrain, SmartCities+CityScene, Infrastructure+PipelineScene
```

### MODIFIED files (Phase 5 — PostFX added):
```
src/components/three/HeroCanvas.jsx                  ← Bloom + vignette post-processing added
src/styles/globals.css                               ← Phase 5 scene styles appended
package.json                                         ← version 5.0.0, postprocessing packages added
```

---

## What you see after applying

### UAV Systems page
- Full 3D drone model with spinning rotors, gimbal camera, antenna, landing gear
- Rotating with floating bob animation
- Bloom glow on all cyan elements
- Component list alongside the scene

### AI / Artificial Intelligence page
- 5-layer neural network with 22 nodes
- Activation pulses travelling along connection lines
- Slow auto-rotation with chromatic aberration post-effect

### Defence & Security sector page
- Custom shader terrain mesh with radar sweep animation
- Target marker diamonds with ping rings at 4 positions
- Radar circle rings expanding outward

### Smart Cities sector page
- Low-poly city buildings with rooftop lights
- Drone following a CatmullRom spline flight path
- Bloom makes the cyan flight path glow

### Infrastructure Monitoring sector page
- Pipeline segments with thermal colour gradient shifting live
- Sensor readout towers bobbing up and down

### All pages
- All sub-page banners have 3D particle canvas behind the title
- Lenis smooth scrolling site-wide
- Bloom/glow on every 3D scene

---

## Do NOT touch these (unchanged):
- src/main.jsx
- src/data/siteData.js
- src/App.jsx
- src/hooks/index.js
- src/hooks/useAnimation.js
- src/components/layout/Navbar.jsx
- src/components/layout/Footer.jsx
- src/components/ui/index.jsx
- src/components/ui/phase4.js
- src/components/ui/cards/
- src/components/ui/display/
- src/components/ui/forms/
- src/components/sections/ (all 6 section files)
- src/pages/HomePage.jsx
- src/pages/ContactPage.jsx
- src/pages/NotFoundPage.jsx
- src/pages/products/SoftwarePage.jsx
- src/pages/products/EngineeringPage.jsx
- src/pages/products/ProductsPage.jsx
- All sector re-export files (DefencePage.jsx etc.)
- index.html, vite.config.js, tailwind.config.js, postcss.config.js
