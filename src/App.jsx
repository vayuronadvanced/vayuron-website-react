import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
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
import ScrollToTop from './components/utils/ScrollToTop'

// ─── Page Transition Wrapper ───────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0,       transition: { duration: 0.25, ease: 'easeIn' } },
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
    <>
  <AnimatePresence mode="wait">
    {isLoading && <LoadingScreen key="loading" />}
  </AnimatePresence>

  {!isLoading && (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      {/* ✅ MUST BE HERE (outside AnimatePresence) */}
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
          <Route path="/technology" element={<PageWrapper><TechnologyPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />

          <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )}
</>
  )
}
