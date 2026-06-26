import { Link } from 'react-router-dom'
import { SITE, FOOTER_LINKS } from '../../data/siteData'

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
                <div className="font-display font-bold uppercase text-white text-sm tracking-[0.12em] group-hover:text-cyan transition-colors">
                  VAYURON
                </div>
                <div className="font-mono text-sm text-white  tracking-[0.2em] uppercase">
                  Advanced Systems
                </div>
              </div>
            </Link>
            <p className="text-white text-sm leading-relaxed max-w-xs mb-6">
              Engineering indigenous innovation in defence, aerospace, and autonomous systems for critical national operations.
            </p>
            
            <div className="flex gap-4 mb-6">

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform duration-300"
            >
              <img
                src="/icons/instagram.png"
                alt="Instagram"
                className="w-7 h-7 object-contain"
              />
            </a>

            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-110 transition-transform duration-300"
            >
              <img
                src="/icons/linkedin.png"
                alt="LinkedIn"
                className="w-7 h-7 object-contain"
              />
            </a>

            <a
              href={SITE.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:scale-110 transition-transform duration-300"
            >
              <img
                src="/icons/x.png"
                alt="X"
                className="w-7 h-7 object-contain"
              />
            </a>

          </div>

            <div className="space-y-1">
              <a href={`tel:${SITE.phoneTel}`} className="block font-mono text-sm text-white hover:text-cyan transition-colors">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="block font-mono text-sm text-white hover:text-cyan transition-colors">
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.08em] text-cyan mb-4">Products</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.products.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="font-sans text-sm text-white hover:text-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-sm tracking-widest uppercase text-cyan mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="font-mono text-sm text-white hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-mono text-sm tracking-widest uppercase text-cyan mb-4">Stay Updated</h4>
            <p className="font-sans text-sm text-white mb-4 leading-relaxed">
              Defence technology insights and company updates.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-black border border-[rgba(0,212,255,0.15)] text-white px-3 py-2 font-mono text-sm focus:border-cyan focus:outline-none transition-colors placeholder-white"
              />
              <button className="border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all px-3 py-2 font-display text-sm uppercase tracking-[0.08em]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(0,212,255,0.08)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-sm text-white">
            © {year} Vayuron Advanced Systems. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none">
            {FOOTER_LINKS.legal.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="font-sans text-sm text-white hover:text-cyan transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
    </footer>
  )
}
