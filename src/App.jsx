{/*App.jsx*/ }

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, lazy, Suspense } from 'react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SmoothScrollProvider from './components/layout/SmoothScrollProvider'
import { LoadingScreen } from './components/ui'
import { useLoadingScreen, useScrollProgress, useGoogleAnalyticsPageviews } from './hooks'
import ScrollToTop from './components/layout/ScrollToTop'
import ProtectedRoute from './components/layout/ProtectedRoute'
import OrganizationSchema from './components/seo/OrganizationSchema'

// ─── Pages ────────────────────────────────────────────────────────────────
// Lazy-loaded so each route lands in its own chunk instead of one giant
// bundle. Navbar/Footer/ScrollToTop/ProtectedRoute stay eager above since
// they're needed on every route regardless.
const HomePage = lazy(() => import('./pages/mainpages/HomePage'))
const ProductsPage = lazy(() => import('./pages/products/ProductsPage'))
const UAVSystemsPage = lazy(() => import('./pages/products/UAVSystemsPage'))
const AIPage = lazy(() => import('./pages/products/AIPage'))
const EngineeringPage = lazy(() => import('./pages/products/EngineeringPage'))
const SectorsPage = lazy(() => import('./pages/sectors/SectorsPage'))
const DefenceHomelandSecurityPage = lazy(() => import('./pages/sectors/DefenceHomelandSecurityPage'))
const GovernmentSmartInfrastructurePage = lazy(() => import('./pages/sectors/GovernmentSmartInfrastructurePage'))
const EnergyIndustrialPage = lazy(() => import('./pages/sectors/EnergyIndustrialPage'))
const AgricultureEnvironmentalPage = lazy(() => import('./pages/sectors/AgricultureEnvironmentalPage'))
const MiningSurveyingResearchPage = lazy(() => import('./pages/sectors/MiningSurveyingResearchPage'))
const TechnologyPage = lazy(() => import('./pages/mainpages/TechnologyPage'))
const AboutPage = lazy(() => import('./pages/mainpages/AboutPage'))
const ContactPage = lazy(() => import('./pages/mainpages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/mainpages/NotFoundPage'))
const CareersPage = lazy(() => import('./pages/mainpages/CareersPage'))
const JobListingPage = lazy(() => import('./pages/mainpages/JobListingPage'))
const MVTXPage = lazy(() => import('./pages/products/MVTXPage'))
const BlogPostPage = lazy(() => import('./pages/mainpages/BlogPostPage'))
const NewsletterUnsubscribePage = lazy(() => import('./pages/mainpages/NewsletterUnsubscribePage'))
const BlogPage = lazy(() => import('./pages/mainpages/BlogPage'))
const LoginPage = lazy(() => import('./pages/mainpages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/mainpages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/mainpages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/mainpages/ResetPasswordPage'))
const VerifyEmailPage = lazy(() => import('./pages/mainpages/VerifyEmailPage'))
const DashboardOverviewPage = lazy(() => import('./pages/dashboard/DashboardOverviewPage'))
const DashboardEnquiriesPage = lazy(() => import('./pages/dashboard/DashboardEnquiriesPage'))
const DashboardQuotationsPage = lazy(() => import('./pages/dashboard/DashboardQuotationsPage'))
const DashboardCareersPage = lazy(() => import('./pages/dashboard/DashboardCareersPage'))
const DashboardBlogPage = lazy(() => import('./pages/dashboard/DashboardBlogPage'))
const DashboardBlogEditorPage = lazy(() => import('./pages/dashboard/DashboardBlogEditorPage'))
const DashboardNewsletterPage = lazy(() => import('./pages/dashboard/DashboardNewsletterPage'))
const DashboardUsersPage = lazy(() => import('./pages/dashboard/DashboardUsersPage'))

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } },
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
      className={`fixed pointer-events-none z-[99999] rounded-full bg-cyan mix-blend-screen transition-transform duration-150 hidden md:block ${hovering ? 'w-8 h-8 opacity-40 -translate-x-4 -translate-y-4' : 'w-3 h-3 opacity-100 -translate-x-1.5 -translate-y-1.5'
        }`}
      style={{ left: pos.x, top: pos.y }}
    />
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation()
  const isLoading = useLoadingScreen(1600)
  useGoogleAnalyticsPageviews()

  return (
    <SmoothScrollProvider>
      <OrganizationSchema />
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
            <Suspense fallback={<LoadingScreen />}>
              <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />

              {/* Products */}
              <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
              <Route path="/products/uav-systems" element={<PageWrapper><UAVSystemsPage /></PageWrapper>} />
              <Route path="/products/artificial-intelligence" element={<PageWrapper><AIPage /></PageWrapper>} />
              <Route path="/products/advanced-engineering" element={<PageWrapper><EngineeringPage /></PageWrapper>} />

              {/* Standalone — not part of PRODUCTS in siteData.js, reachable only via this route and the dedicated navbar link */}
              <Route path="/products/mvtx" element={<PageWrapper><MVTXPage /></PageWrapper>} />

              {/* Sectors */}
              <Route path="/sectors" element={<PageWrapper><SectorsPage /></PageWrapper>} />
              <Route path="/sectors/defence-homeland-security" element={<PageWrapper><DefenceHomelandSecurityPage /></PageWrapper>} />
              <Route path="/sectors/government-smart-infrastructure" element={<PageWrapper><GovernmentSmartInfrastructurePage /></PageWrapper>} />
              <Route path="/sectors/energy-industrial-critical-infrastructure" element={<PageWrapper><EnergyIndustrialPage /></PageWrapper>} />
              <Route path="/sectors/agriculture-environmental-intelligence" element={<PageWrapper><AgricultureEnvironmentalPage /></PageWrapper>} />
              <Route path="/sectors/mining-surveying-research" element={<PageWrapper><MiningSurveyingResearchPage /></PageWrapper>} />

              {/* Core Pages */}
              <Route path="/careers" element={<PageWrapper><CareersPage /></PageWrapper>} />
              <Route path="/careers/:slug" element={<PageWrapper><JobListingPage /></PageWrapper>} />
              <Route path="/technology" element={<PageWrapper><TechnologyPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
              <Route path="/newsletter/unsubscribe/:token" element={<PageWrapper><NewsletterUnsubscribePage /></PageWrapper>} />
              <Route path="/blog/:slug" element={<PageWrapper><BlogPostPage /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
              <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />
              <Route path="/forgot-password" element={<PageWrapper><ForgotPasswordPage /></PageWrapper>} />
              <Route path="/reset-password/:uid/:token" element={<PageWrapper><ResetPasswordPage /></PageWrapper>} />
              <Route path="/verify-email/:uid/:token" element={<PageWrapper><VerifyEmailPage /></PageWrapper>} />

              {/* Admin Dashboard (Stage 4, Phase 4.1) — staff only */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardOverviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/enquiries"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardEnquiriesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/quotations"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardQuotationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/careers"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardCareersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/blog"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardBlogPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/blog/new"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardBlogEditorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/blog/:slug/edit"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardBlogEditorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/newsletter"
                element={
                  <ProtectedRoute roles={['admin', 'employee']}>
                    <DashboardNewsletterPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/users"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <DashboardUsersPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
              </Routes>
            </Suspense>
          </AnimatePresence>

          <Footer />
        </>
      )}
    </SmoothScrollProvider>
  )
}
