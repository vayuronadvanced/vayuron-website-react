{/*Footer.jsx*/ }

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE, FOOTER_LINKS, gmailComposeUrl } from '../../data/siteData'
import { useApi } from '../../hooks'
import { subscribeToNewsletter } from '../../lib/api/newsletter'
import { logBusinessEvent } from '../../lib/api/analytics'
import { trackEvent } from '../../lib/googleAnalytics'

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { loading, error, run: subscribe } = useApi(subscribeToNewsletter)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      await subscribe(email)
      setSubscribed(true)
      setEmail('')
      logBusinessEvent('newsletter_subscribed')
      trackEvent('sign_up', { method: 'newsletter' })
    } catch {
      // error is surfaced via the `error` value from useApi below
    }
  }

  return (
    <footer
      className="relative mt-auto border-t border-[rgba(0,212,255,0.15)] overflow-hidden bg-gradient-to-b from-black via-[#050608] to-black"
    >

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-5">

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-start gap-20 py-2">

          {/* Brand */}
          <div className="flex flex-col items-start max-w-md">

            <Link to="/" className="group inline-block">

              <h2 className="font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.6rem] leading-none tracking-[0.05em] text-cyan group-hover:text-white transition-colors">
                VAYURON
              </h2>

              <p className="font-mono text-xs md:text-sm tracking-[0.30em] uppercase text-white mt-1">
                ADVANCED SYSTEMS
              </p>

            </Link>

            {/* Social Icons */}
            <div className="flex gap-3 mt-3">

              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/icons/instagram.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                  loading="lazy"
                  className="w-7 h-7"
                />
              </a>

              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/icons/linkedin.png"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                  loading="lazy"
                  className="w-7 h-7"
                />
              </a>

              <a
                href={SITE.x}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/icons/x.png"
                  alt="X"
                  width={28}
                  height={28}
                  loading="lazy"
                  className="w-7 h-7"
                />
              </a>

            </div>

            {/* Address */}
            <a
              href="https://maps.google.com/?q=47+Balaji+Nagar,+Ayodhya+Nagar,+Bhopal,+Madhya+Pradesh+462023"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2 text-xs text-white/100 hover:text-cyan transition-colors leading-relaxed"
            >
              <span>
                47, Balaji Nagar,Ayodhya Bypass,<br />
                Bhopal,Madhya Pradesh 462023, INDIA
              </span>
            </a>

            {/* Contact */}
            <div className="mt-2 space-y-1">

              <a
                href={`tel:${SITE.phoneTel}`}
                className="block text-sm text-white hover:text-cyan transition-colors"
              >
                {SITE.phone}
              </a>

              <a
                href={gmailComposeUrl(SITE.email)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white hover:text-cyan transition-colors"
              >
                {SITE.email}
              </a>

            </div>

          </div>

          {/* Site Navigation — was previously missing entirely: FOOTER_LINKS
              (products/sectors/company) was already defined in siteData.js
              but never rendered anywhere, so every important page only had
              inbound links from the navbar dropdowns and homepage grids.
              Since the footer renders on every single page, this is the
              single highest-leverage place to add internal links. */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 lg:justify-self-end lg:max-w-lg">

            <div>
              <h4 className="font-display text-sm uppercase tracking-[0.12em] text-cyan mb-3">
                Products
              </h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.products.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-white/100 hover:text-cyan transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm uppercase tracking-[0.12em] text-cyan mb-3">
                Sectors
              </h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.sectors.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-white/100 hover:text-cyan transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/sectors" className="text-sm text-white/100 hover:text-cyan transition-colors">
                    All Sectors
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm uppercase tracking-[0.12em] text-cyan mb-3">
                Company
              </h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-white/100 hover:text-cyan transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Newsletter */}
        <div className="w-full max-w-sm py-2">

            <h4 className="font-display text-lg uppercase tracking-[0.12em] text-cyan mb-2">
              Stay Updated
            </h4>

            <p className="text-sm text-white/100 mb-3">
              Defence technology insights and company updates.
            </p>

            {subscribed ? (
              <p className="text-sm text-cyan/90 leading-relaxed">
                You&apos;re subscribed. Thanks for staying updated.
              </p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                />

                {error && (
                  <p className="text-xs text-red-400 mt-1 leading-relaxed">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 border border-cyan py-2 text-cyan uppercase text-sm tracking-[0.12em] hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(0,212,255,0.08)] mt-5 pt-3 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-white/100 text-center md:text-left">
            © {year} Vayuron Advanced Systems. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/100 hover:text-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>

      </div> {/* closes relative z-10 */}

    </footer>
  )
}