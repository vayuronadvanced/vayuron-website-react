{/*App.jsx*/}

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SmoothScrollProvider from './components/layout/SmoothScrollProvider'
import { LoadingScreen } from './components/ui'
import { useLoadingScreen, useScrollProgress } from './hooks'

// ─── Pages ────────────────────────────────────────────────────────────────
import HomePage from './pages/HomePage'
import ProductsPage from './pages/products/ProductsPage'
import UAVSystemsPage from './pages/products/UAVSystemsPage'
import AIPage from './pages/products/AIPage'
import SoftwarePage from './pages/products/SoftwarePage'
import EngineeringPage from './pages/products/EngineeringPage'
import SectorsPage from './pages/sectors/SectorsPage'
import DefencePage from './pages/sectors/DefencePage'
import SmartCitiesPage from './pages/sectors/SmartCitiesPage'
import MunicipalPage from './pages/sectors/MunicipalPage'
import InfrastructurePage from './pages/sectors/InfrastructurePage'
import AgriculturePage from './pages/sectors/AgriculturePage'
import DisasterPage from './pages/sectors/DisasterPage'
import EnvironmentalPage from './pages/sectors/EnvironmentalPage'
import IndustrialPage from './pages/sectors/IndustrialPage'
import TechnologyPage from './pages/TechnologyPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import AvionicsPage from './pages/products/AvionicsPage'
import CarbonCompositePage from './pages/products/CarbonCompositePage'
import DroneModelsPage from './pages/products/DroneModelsPage'
import ScrollToTop from './components/layout/ScrollToTop'
import CareersPage from './pages/CareersPage'
import MVTXPage from './pages/products/MVTXPage'

// ─── Page Transition Wrapper ───────────────────────────────────────────────
// Echoes the in-page StackSection effect at the route level: the incoming
// page rises up (as if covering the outgoing one) instead of a flat fade,
// so navigating between pages feels like the same "cover" motion used
// between sections.
const pageVariants = {
  initial: { opacity: 0, y: 40 },
  enter:   { opacity: 1, y: 0,   transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -40, transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

// ─── Scroll Progress Bar ───────────────────────────────────────────────────
function ScrollProgressBar() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-cyan z-[9998] origin-left shadow-cyan transition-none"
      style={{ width: `${progress}%` }}
    />
  )
}

// ─── Custom Cursor ─────────────────────────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const enter = () => setHovering(true)
    const leave = () => setHovering(false)
    window.addEventListener('mousemove', move)

    const bindHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    bindHover()
    const observer = new MutationObserver(bindHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className={`fixed pointer-events-none z-[99999] rounded-full bg-cyan mix-blend-screen transition-transform duration-150 hidden md:block ${
        hovering ? 'w-8 h-8 opacity-40 -translate-x-4 -translate-y-4' : 'w-3 h-3 opacity-100 -translate-x-1.5 -translate-y-1.5'
      }`}
      style={{ left: pos.x, top: pos.y }}
    />
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation()
  const isLoading = useLoadingScreen(1600)

  return (
    // Mounted once for the app's whole lifetime — route changes render
    // inside this, they never remount it. This is what lets ScrollToTop
    // reset the SAME Lenis instance on navigation instead of racing a
    // dying one from the previous page.
    <SmoothScrollProvider>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />

          {/* MUST be here: inside SmoothScrollProvider, outside AnimatePresence */}
          <ScrollToTop />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />

              {/* Products */}
              <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
              <Route path="/products/uav-systems" element={<PageWrapper><UAVSystemsPage /></PageWrapper>} />
              <Route path="/products/artificial-intelligence" element={<PageWrapper><AIPage /></PageWrapper>} />
              <Route path="/products/software-systems" element={<PageWrapper><SoftwarePage /></PageWrapper>} />
              <Route path="/products/advanced-engineering" element={<PageWrapper><EngineeringPage /></PageWrapper>} />
              <Route path="/products/avionics" element={<PageWrapper><AvionicsPage /></PageWrapper>} />
              <Route path="/products/carbon-composite" element={<PageWrapper><CarbonCompositePage /></PageWrapper>} />
              <Route path="/products/drone-models" element={<PageWrapper><DroneModelsPage /></PageWrapper>} />

              {/* Standalone — not part of PRODUCTS in siteData.js, reachable only via this route and the dedicated navbar link */}
              <Route path="/products/mvtx" element={<PageWrapper><MVTXPage /></PageWrapper>} />

              {/* Sectors */}
              <Route path="/sectors" element={<PageWrapper><SectorsPage /></PageWrapper>} />
              <Route path="/sectors/defence-security" element={<PageWrapper><DefencePage /></PageWrapper>} />
              <Route path="/sectors/smart-cities" element={<PageWrapper><SmartCitiesPage /></PageWrapper>} />
              <Route path="/sectors/municipal-operations" element={<PageWrapper><MunicipalPage /></PageWrapper>} />
              <Route path="/sectors/infrastructure-monitoring" element={<PageWrapper><InfrastructurePage /></PageWrapper>} />
              <Route path="/sectors/agriculture" element={<PageWrapper><AgriculturePage /></PageWrapper>} />
              <Route path="/sectors/disaster-management" element={<PageWrapper><DisasterPage /></PageWrapper>} />
              <Route path="/sectors/environmental-monitoring" element={<PageWrapper><EnvironmentalPage /></PageWrapper>} />
              <Route path="/sectors/industrial-inspection" element={<PageWrapper><IndustrialPage /></PageWrapper>} />

              {/* Core Pages */}
              <Route path="/careers" element={<PageWrapper><CareersPage /></PageWrapper>} />
              <Route path="/technology" element={<PageWrapper><TechnologyPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />

              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </>
      )}
    </SmoothScrollProvider>
  )
}
