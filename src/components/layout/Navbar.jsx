{/*Navbar.jsx*/ }

import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, PRODUCTS, SECTORS } from '../../data/siteData'
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

const mobileMenuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.2 } },
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

                        {/*}    <Link
                          to="/products/mvtx"
                          className="flex items-center gap-3 w-full px-2 py-2 rounded-sm hover:bg-[rgba(0,212,255,0.05)] transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-dim group-hover:bg-cyan transition-colors flex-shrink-0" />
                            <h3 className="font-sans font-semibold text-xs text-white group-hover:text-cyan transition-colors">
                              MVTX
                            </h3>
                          </div>
                        </Link> */}
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
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden" animate="visible" exit="exit"
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-lg pt-20 overflow-y-auto xl:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between py-3 font-sans text-xs tracking-[0.14em] uppercase text-muted hover:text-white transition-colors border-b border-[rgba(0,212,255,0.08)]"
                      >
                        {link.label}
                        <span className={`transition-transform ${mobileExpanded === link.label ? 'rotate-180' : ''}`}>▾</span>
                      </button>

                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {(link.label === 'Products' ? PRODUCTS : SECTORS).map((item) => (
                              <Link
                                key={item.id}
                                to={item.path}
                                onClick={(e) => scrollToTop(e, location.pathname, item.path)}
                                className="block px-3 py-3 rounded-sm hover:bg-[rgba(0,212,255,0.05)] transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-1 h-1 rounded-full bg-dim group-hover:bg-cyan transition-colors flex-shrink-0" />

                                  <div>
                                    <h3 className="font-sans font-semibold text-sm text-white group-hover:text-cyan transition-colors">
                                      {item.label}
                                    </h3>

                                    {link.label === 'Products' && (
                                      <p className="text-xs text-white/100 mt-1 leading-relaxed">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={(e) => scrollToTop(e, location.pathname, link.path)}
                      className={({ isActive }) =>
                        `block py-3 font-sans text-xs tracking-[0.14em] uppercase border-b border-[rgba(0,212,255,0.08)] transition-colors ${isActive ? 'text-cyan' : 'text-white hover:text-cyan'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}

              <Link
                to="/contact"
                className="mt-6 w-full border border-cyan text-cyan text-center py-3 font-sans text-xs tracking-[0.14em] uppercase hover:bg-cyan hover:text-black transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
