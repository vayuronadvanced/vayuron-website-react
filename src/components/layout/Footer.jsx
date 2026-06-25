import { Link } from 'react-router-dom'
import { SITE, FOOTER_LINKS } from '../../data/siteData'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.3-8.3L1 2h6.2l4.3 5.7L18.9 2z"/>
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-[rgba(0,212,255,0.1)] mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div>
                <div className="font-display font-bold text-white text-xl tracking-wider group-hover:text-cyan transition-colors">
                  VAYURON
                </div>
                <div className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase">
                  Advanced Systems
                </div>
              </div>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
              Engineering indigenous innovation in defence, aerospace, and autonomous systems for critical national operations.
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href={SITE.instagram}
                target="_blank" rel="noopener noreferrer"
                className="text-dim hover:text-cyan transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim hover:text-cyan transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>

              <a
                href={SITE.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim hover:text-cyan transition-colors"
                aria-label="X"
              >
                <XIcon />
              </a>
            </div>
            <div className="space-y-1">
              <a href={`tel:${SITE.phoneTel}`} className="block font-mono text-xs text-muted hover:text-cyan transition-colors">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="block font-mono text-xs text-muted hover:text-cyan transition-colors">
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Products</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.products.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="font-mono text-xs text-muted hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="font-mono text-xs text-muted hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Stay Updated</h4>
            <p className="font-mono text-xs text-muted mb-4 leading-relaxed">
              Defence technology insights and company updates.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-black border border-[rgba(0,212,255,0.15)] text-text px-3 py-2 font-mono text-xs focus:border-cyan focus:outline-none transition-colors placeholder-dim"
              />
              <button className="border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all px-3 py-2 font-mono text-xs tracking-widest uppercase">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(0,212,255,0.08)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-xs text-dim">
            © {year} Vayuron Advanced Systems. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.legal.map(link => (
              <Link key={link.path} to={link.path} className="font-mono text-xs text-dim hover:text-muted transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
