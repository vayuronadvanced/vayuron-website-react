{/*NotFound-404Page*/}

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found — Vayuron Advanced Systems</title>
      </Helmet>
      <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 grid-overlay opacity-40" />

        <div className="relative text-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-6">
              Error 404
            </p>
            <h1 className="font-display text-7xl sm:text-8xl font-bold text-white mb-4 text-glow-cyan">
              404
            </h1>
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              Target Not Found
            </h2>
            <p className="text-muted mb-10 leading-relaxed">
              The page you are looking for does not exist or has been moved.
              Return to base and reacquire your target.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all px-6 py-3 font-mono text-xs tracking-widest uppercase"
              >
                Return to Home
              </Link>
              <Link
                to="/contact"
                className="border border-dim text-muted hover:border-muted hover:text-white transition-all px-6 py-3 font-mono text-xs tracking-widest uppercase"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
