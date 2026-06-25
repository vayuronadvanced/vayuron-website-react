import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, PRODUCTS, SECTORS, SITE } from '../../data/siteData'

const VayuronLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
    <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5"/>
    <circle cx="18" cy="18" r="3" fill="#00d4ff"/>
    <line x1="18" y1="2"  x2="18" y2="8"  stroke="#00d4ff" strokeWidth="1"/>
    <line x1="34" y1="10" x2="28" y2="13" stroke="#00d4ff" strokeWidth="1"/>
    <line x1="34" y1="26" x2="28" y2="23" stroke="#00d4ff" strokeWidth="1"/>
    <line x1="18" y1="34" x2="18" y2="28" stroke="#00d4ff" strokeWidth="1"/>
    <line x1="2"  y1="26" x2="8"  y2="23" stroke="#00d4ff" strokeWidth="1"/>
    <line x1="2"  y1="10" x2="8"  y2="13" stroke="#00d4ff" strokeWidth="1"/>
  </svg>
)

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

const mobileMenuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:   { opacity: 0, x: '100%', transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-[rgba(0,212,255,0.1)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <VayuronLogo />
            <div>
              <div className="font-display font-bold text-white text-lg leading-none tracking-wider group-hover:text-cyan transition-colors">
                VAYURON
              </div>
              <div className="font-mono text-[9px] text-muted tracking-[0.2em] uppercase">
                Advanced Systems
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative">
                {link.hasDropdown ? (
                  <button
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={`flex items-center gap-1 px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors ${
                      location.pathname.startsWith(link.path)
                        ? 'text-cyan'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="mt-0.5">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    </svg>
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors block ${
                        isActive ? 'text-cyan' : 'text-muted hover:text-white'
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
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-1 w-80 bg-surface border border-[rgba(0,212,255,0.15)] rounded-sm shadow-2xl"
                    >
                      <div className="p-2">
                        {PRODUCTS.map((product) => (
                          <Link
                            key={product.id}
                            to={product.path}
                            className="flex items-start gap-3 p-3 rounded-sm hover:bg-[rgba(0,212,255,0.05)] transition-colors group"
                          >
                            <span className="text-cyan mt-0.5 text-lg">{product.icon}</span>
                            <div>
                              <div className="font-display font-semibold text-white text-sm group-hover:text-cyan transition-colors">
                                {product.label}
                              </div>
                              <div className="text-muted text-xs mt-0.5 leading-relaxed">
                                {product.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-[rgba(0,212,255,0.1)] p-3">
                        <Link to="/products" className="font-mono text-xs text-cyan hover:text-white transition-colors flex items-center gap-1">
                          View All Products →
                        </Link>
                      </div>
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
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-1 w-72 bg-surface border border-[rgba(0,212,255,0.15)] rounded-sm shadow-2xl"
                    >
                      <div className="p-2 grid grid-cols-1 gap-0.5">
                        {SECTORS.map((sector) => (
                          <Link
                            key={sector.id}
                            to={sector.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-[rgba(0,212,255,0.05)] transition-colors group"
                          >
                            <span className="w-1 h-1 rounded-full bg-dim group-hover:bg-cyan transition-colors flex-shrink-0"/>
                            <span className="font-mono text-xs text-muted group-hover:text-white transition-colors">
                              {sector.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-[rgba(0,212,255,0.1)] p-3">
                        <Link to="/sectors" className="font-mono text-xs text-cyan hover:text-white transition-colors flex items-center gap-1">
                          View All Sectors →
                        </Link>
                      </div>
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
              className="hidden lg:flex items-center gap-2 border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all duration-200 px-4 py-2 font-mono text-xs tracking-widest uppercase"
            >
              Get in Touch
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 text-muted hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
              <span className={`block w-5 h-px bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`}/>
              <span className={`block w-5 h-px bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
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
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-lg pt-20 overflow-y-auto lg:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between py-3 font-mono text-xs tracking-widest uppercase text-muted hover:text-white transition-colors border-b border-[rgba(0,212,255,0.08)]"
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
                                className="flex items-center gap-2 py-2 pl-4 font-mono text-xs text-muted hover:text-cyan transition-colors"
                              >
                                <span className="w-1 h-1 rounded-full bg-dim"/>
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block py-3 font-mono text-xs tracking-widest uppercase border-b border-[rgba(0,212,255,0.08)] transition-colors ${
                          isActive ? 'text-cyan' : 'text-muted hover:text-white'
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
                className="mt-6 w-full border border-cyan text-cyan text-center py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all"
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
