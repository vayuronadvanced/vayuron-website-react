import { Link } from 'react-router-dom'
import { SITE, FOOTER_LINKS } from '../../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
      <footer
        className="relative mt-auto border-t border-[rgba(0,212,255,0.1)] overflow-hidden"
     // className="relative mt-auto overflow-hidden border-t border-gray-400 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-400"
     // Changes footer colour
        style={{
          //backgroundImage: "url('/Footer.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      {/* Dark Overlay  - <div className="absolute inset-0 bg-black/10"></div>- */}
      

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-6">      
      {/* Your existing footer content */}

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-center gap-24 py-3">

      {/* Brand */}
      <div className="flex flex-col items-start max-w-md">

        <Link to="/" className="group inline-block">

          <h2 className="font-display text-[2.8rem] md:text-[3.6rem] leading-none tracking-[0.05em] text-cyan group-hover:text-white transition-colors">
            VAYURON
          </h2>

          <p className="font-mono text-xs md:text-sm tracking-[0.30em] uppercase text-white mt-1">
            ADVANCED SYSTEMS
          </p>

        </Link>

        {/* Social Icons */}
        <div className="flex gap-3 mt-4">

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="/icons/instagram.png"
              alt="Instagram"
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
              className="w-7 h-7"
            />
          </a>

        </div>

        {/* Contact */}
        <div className="mt-3 space-y-1">

          <a
            href={`tel:${SITE.phoneTel}`}
            className="block text-sm text-white hover:text-cyan transition-colors"
          >
            {SITE.phone}
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="block text-sm text-white hover:text-cyan transition-colors"
          >
            {SITE.email}
          </a>

        </div>

      </div>

      {/* Newsletter */}
          <div className="justify-self-end w-full max-w-sm">

            <h4 className="font-display text-lg uppercase tracking-[0.12em] text-cyan mb-2">
              Stay Updated
            </h4>

            <p className="text-sm text-white/80 mb-4">
              Defence technology insights and company updates.
            </p>

            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />

            <button
              className="w-full mt-2 border border-cyan py-2 text-cyan uppercase text-sm tracking-[0.12em] hover:bg-cyan hover:text-black transition-all"
            >
              Subscribe
            </button>

          </div>
          </div>
          
        {/* Bottom Bar */}
        <div className="border-t border-[rgba(0,212,255,0.08)] mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-white/70 text-center md:text-left">
            © {year} Vayuron Advanced Systems. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-white/70 hover:text-cyan transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>  

      </div> {/* closes relative z-10 */}

  </footer>
  )
}