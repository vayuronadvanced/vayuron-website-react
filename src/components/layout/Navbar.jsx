{/*Navbar.jsx*/ }

import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, PRODUCTS, SECTORS, SITE } from '../../data/siteData'
import { scrollToTop } from '../../utils/scrollToTop'

const VayuronLogo = () => (
  <img
    src="/favicon.jpeg"
    alt="Vayuron Logo"
    className="w-10 h-10 object-contain shrink-0"
  />
)

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

// Mobile drawer: panel slides in from the right over a dimmed/blurred backdrop.
const mobileBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const mobileDrawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 320, damping: 34 } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
}

const mobileListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showAllSectors, setShowAllSectors] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)

  const DROPDOWN_PREVIEW_COUNT = 4

  const closeDropdown = () => {
    setActiveDropdown(null)
    // Collapse back to the 4-item preview so the next hover starts fresh.
    setShowAllProducts(false)
    setShowAllSectors(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setShowAllProducts(false)
    setShowAllSectors(false)
  }, [location])

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-[rgba(0,212,255,0.1)] py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => scrollToTop(e, location.pathname, "/")}
            className="flex items-center gap-3 group shrink-0"
          >
            <VayuronLogo />

            <div className="flex flex-col justify-center leading-none">
              <span className="font-display font-bold uppercase text-white text-lg leading-none tracking-[0.12em] group-hover:text-cyan transition-colors">
                VAYURON
              </span>

              <span className="font-sans text-[9px] text-white/100 tracking-[0.2em] uppercase mt-[3px]">
                Advanced Systems
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="flex items-center"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={closeDropdown}
                  >
                    <Link
                      to={link.path}
                      onClick={(e) => scrollToTop(e, location.pathname, link.path)}
                      className={`px-4 py-2 font-sans text-xs tracking-[0.14em] uppercase transition-colors ${location.pathname.startsWith(link.path)
                        ? 'text-cyan'
                        : 'text-white hover:text-cyan'
                        }`}
                    >
                      {link.label}
                    </Link>

                    <button
                      className="pr-4 py-2 text-white hover:text-cyan transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        <path
                          d="M2 3.5L5 6.5L8 3.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          fill="none"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={(e) => scrollToTop(e, location.pathname, link.path)}
                    className={({ isActive }) =>
                      `px-4 py-2 font-sans text-xs tracking-[0.14em] uppercase transition-colors block ${isActive ? 'text-cyan' : 'text-white hover:text-cyan'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}

                {/* Products Dropdown */}
                <AnimatePresence>
                  {link.label === 'Products' && activeDropdown === 'Products' && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden" animate="visible" exit="exit"
                      onMouseEnter={() => setActiveDropdown('Products')}
                      onMouseLeave={closeDropdown}
                      className="absolute top-full left-0 mt-1 w-80 bg-surface border border-[rgba(0,212,255,0.15)] rounded-sm shadow-2xl"
                    >
                      <div className="p-2">
                        {(showAllProducts ? PRODUCTS : PRODUCTS.slice(0, DROPDOWN_PREVIEW_COUNT)).map((product) => (
                          <Link
                            key={product.id}
                            to={product.path}
                            onClick={(e) => scrollToTop(e, location.pathname, product.path)}
                            className="flex items-center gap-3 w-full px-2 py-2 rounded-sm hover:bg-[rgba(0,212,255,0.05)] transition-colors group"                          >
                            {/* Heading */}
                            <div className="flex items-center gap-3">
                              <span className="w-1 h-1 rounded-full bg-dim group-hover:bg-cyan transition-colors flex-shrink-0" />

                              <h3 className="font-sans font-semibold text-xs text-white group-hover:text-cyan transition-colors">
                                {product.label}
                              </h3>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {!showAllProducts && PRODUCTS.length > DROPDOWN_PREVIEW_COUNT && (
                        <div className="border-t border-[rgba(0,212,255,0.1)] p-3">
                          <button
                            onClick={() => setShowAllProducts(true)}
                            className="font-sans text-xs text-cyan hover:text-white transition-colors flex items-center gap-1 w-full text-left"
                          >
                            View More ({PRODUCTS.length - DROPDOWN_PREVIEW_COUNT} More)
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sectors Dropdown */}
                <AnimatePresence>
                  {link.label === 'Sectors' && activeDropdown === 'Sectors' && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden" animate="visible" exit="exit"
                      onMouseEnter={() => setActiveDropdown('Sectors')}
                      onMouseLeave={closeDropdown}
                      className="absolute top-full left-0 mt-1 w-72 bg-surface border border-[rgba(0,212,255,0.15)] rounded-sm shadow-2xl"
                    >
                      <div className="p-2">
                        {(showAllSectors ? SECTORS : SECTORS.slice(0, DROPDOWN_PREVIEW_COUNT)).map((sector) => (
                          <Link
                            key={sector.id}
                            to={sector.path}
                            onClick={(e) => scrollToTop(e, location.pathname, sector.path)}
                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-[rgba(0,212,255,0.05)] transition-colors group"
                          >
                            <span className="w-1 h-1 rounded-full bg-dim group-hover:bg-cyan transition-colors flex-shrink-0" />

                            <h3 className="font-sans font-semibold text-xs text-white group-hover:text-cyan transition-colors">
                              {sector.label}
                            </h3>
                          </Link>
                        ))}
                      </div>

                      {!showAllSectors && SECTORS.length > DROPDOWN_PREVIEW_COUNT && (
                        <div className="border-t border-[rgba(0,212,255,0.1)] p-3">
                          <button
                            onClick={() => setShowAllSectors(true)}
                            className="font-sans text-xs text-cyan hover:text-white transition-colors flex items-center gap-1 w-full text-left"
                          >
                            View More ({SECTORS.length - DROPDOWN_PREVIEW_COUNT} More)
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden xl:flex items-center gap-2 border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all duration-200 px-4 py-2 font-sans text-xs tracking-[0.14em] uppercase"
            >
              Get in Touch
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden flex flex-col gap-1.5 p-2 text-white hover:text-cyan transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — tap outside the drawer to close */}
            <motion.div
              variants={mobileBackdropVariants}
              initial="hidden" animate="visible" exit="exit"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm xl:hidden"
            />

            {/* Slide-in drawer */}
            <motion.div
              variants={mobileDrawerVariants}
              initial="hidden" animate="visible" exit="exit"
              className="fixed top-0 right-0 z-50 h-full w-[86%] max-w-sm bg-surface border-l border-cyan-dim shadow-2xl xl:hidden flex flex-col bg-grid-cyan bg-grid"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-cyan-dim shrink-0">
                <Link
                  to="/"
                  onClick={(e) => { scrollToTop(e, location.pathname, "/"); setMobileOpen(false) }}
                  className="flex items-center gap-3 group"
                >
                  <VayuronLogo />
                  <div className="flex flex-col justify-center leading-none">
                    <span className="font-display font-bold uppercase text-white text-base leading-none tracking-[0.12em] group-hover:text-cyan transition-colors">
                      VAYURON
                    </span>
                    <span className="font-sans text-[8px] text-muted tracking-[0.2em] uppercase mt-[3px]">
                      Advanced Systems
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-cyan-dim text-white hover:text-cyan hover:border-cyan-mid hover:bg-[rgba(0,212,255,0.06)] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav list */}
              <motion.div
                variants={mobileListVariants}
                initial="hidden" animate="visible"
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1.5"
              >
                {NAV_LINKS.map((link) => {
                  const isActiveTop = location.pathname.startsWith(link.path)
                  return (
                    <motion.div key={link.label} variants={mobileItemVariants}>
                      {link.hasDropdown ? (
                        <div className="rounded-lg overflow-hidden bg-[rgba(255,255,255,0.02)] border border-transparent hover:border-cyan-dim transition-colors">
                          <button
                            onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                            className={`w-full flex items-center justify-between pl-4 pr-3 py-3.5 font-sans text-xs tracking-[0.14em] uppercase transition-colors ${isActiveTop ? 'text-cyan' : 'text-white'
                              }`}
                          >
                            <span className="flex items-center gap-3">
                              <span className={`w-1 h-4 rounded-full transition-colors ${isActiveTop ? 'bg-cyan' : 'bg-transparent'}`} />
                              {link.label}
                            </span>
                            <svg
                              width="11" height="11" viewBox="0 0 10 10" fill="none"
                              className={`transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180 text-cyan' : 'text-muted'}`}
                            >
                              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>

                          <AnimatePresence>
                            {mobileExpanded === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-2 pb-2 flex flex-col gap-1">
                                  {(link.label === 'Products' ? PRODUCTS : SECTORS).map((item) => (
                                    <Link
                                      key={item.id}
                                      to={item.path}
                                      onClick={(e) => scrollToTop(e, location.pathname, item.path)}
                                      className="flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-[rgba(0,212,255,0.06)] transition-colors group"
                                    >
                                      <span className="w-1 h-1 mt-2 rounded-full bg-dim group-hover:bg-cyan group-hover:shadow-cyan-sm transition-colors flex-shrink-0" />
                                      <div>
                                        <h3 className="font-sans font-semibold text-sm text-white group-hover:text-cyan transition-colors">
                                          {item.label}
                                        </h3>
                                        {link.label === 'Products' && item.description && (
                                          <p className="text-xs text-muted mt-0.5 leading-relaxed">
                                            {item.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <NavLink
                          to={link.path}
                          onClick={(e) => scrollToTop(e, location.pathname, link.path)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 pl-4 pr-3 py-3.5 rounded-lg font-sans text-xs tracking-[0.14em] uppercase transition-colors ${isActive
                              ? 'text-cyan bg-[rgba(0,212,255,0.06)]'
                              : 'text-white hover:bg-[rgba(255,255,255,0.03)]'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className={`w-1 h-4 rounded-full transition-colors ${isActive ? 'bg-cyan' : 'bg-transparent'}`} />
                              {link.label}
                            </>
                          )}
                        </NavLink>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Drawer footer — CTA + socials */}
              <div className="px-5 py-5 border-t border-cyan-dim shrink-0">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-md border border-cyan text-cyan text-center py-3 font-sans text-xs tracking-[0.14em] uppercase hover:bg-cyan hover:text-black hover:shadow-cyan transition-all duration-200"
                >
                  Get in Touch
                </Link>

                <div className="flex items-center justify-center gap-4 mt-5">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all">
                    <img src="/icons/instagram.png" alt="Instagram" className="w-5 h-5" />
                  </a>
                  <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all">
                    <img src="/icons/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                  </a>
                  <a href={SITE.x} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all">
                    <img src="/icons/x.png" alt="X" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
