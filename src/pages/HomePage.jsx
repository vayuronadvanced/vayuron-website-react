import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { SectionHeader, StatCard, FeatureCard, CTAButton, CyanDivider } from '../components/ui'
import { PRODUCTS, SECTORS, SITE } from '../data/siteData'
import { useScrollReveal } from '../hooks'

// ─── Hero Section ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-24 pb-24">      
      
      {/* Drone Background Image */}
      <img
        src="/drone-bg.png"
        alt="Drone Background"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,212,255,0.04)] via-transparent to-transparent" />

      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-6"
        >
          Defence · Aerospace · Autonomous Systems
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-none tracking-tight mb-6"
        >
          Vayuron
          <br />
          <span className="text-cyan">Advanced</span>
          <br />
          Systems
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Vayuron Advanced Systems builds autonomous UAVs, AI platforms, and defence-grade
          software for critical national and industrial operations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-x-12 gap-y-6 justify-center mt-6"
        >
          <CTAButton to="/products" variant="primary">Explore Products</CTAButton>
          <CTAButton to="/about" variant="secondary">Our Mission</CTAButton>
        </motion.div>
      </div>

    </section>
  )
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useScrollReveal()
  return (
    <section
      ref={ref}
      className="reveal relative border-y border-[rgba(0,212,255,0.1)] py-12 overflow-hidden"
      style={{
        backgroundImage: "url('/Tablong.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Dark Overlay : <div className="absolute inset-0 bg-black/70"></div> */}
      

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatCard value={8} suffix="+" label="Sectors Served" />
        <StatCard value={4} suffix="" label="Product Lines" />
        <StatCard value={50} suffix="+" label="Deployments" />
        <StatCard value={100} suffix="+" label="Team Members" />
      </div>
    </section>
  )
}

// ─── Products Preview ──────────────────────────────────────────────────────
function ProductsPreview() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/rectors.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay : <div className="absolute inset-0 bg-black/70"></div> */}
      

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 py-16">
        <SectionHeader
          eyebrow="Capabilities"
          title="Our Product Lines"
          subtitle="Four core technology domains engineered for defence, security, and industrial operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              to={product.path}
              className="group relative overflow-hidden rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-4 flex items-start gap-3">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

              <span className="text-cyan text-2xl mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                {product.icon}
              </span>
              
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">
                  {product.label}
                </h3>

                <p className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors mb-4">
                  {product.description}
                </p>

                <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan group-hover:text-white transition-colors">
                  Learn More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

              </div>
            </Link>
            
          ))}
        </div>

        <div className="text-center">
          <CTAButton to="/products" variant="secondary">
            View All Products
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

// ─── Sectors Preview ───────────────────────────────────────────────────────
function SectorsPreview() {
  return (
    <section
      className="relative min-h-screen flex items-center border-y border-[rgba(0,212,255,0.08)] overflow-hidden"
      style={{
        backgroundImage: "url('/Operational DomainsHome.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center", // Move the image to the right
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay : <div className="absolute inset-0 bg-black/70"></div> */}
      

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 py-16">
        <SectionHeader
          eyebrow="Sectors"
          title="Operational Domains"
          subtitle="Delivering autonomous intelligence across eight critical industries."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {SECTORS.map((sector, i) => (
            <Link
              key={sector.id}
              to={sector.path}
              className="group border border-[rgba(0,212,255,0.08)] hover:border-cyan p-4 transition-all duration-200 flex items-center gap-3"
            >
              <span className="font-sans text-sm font-medium text-muted group-hover:text-white transition-colors leading-tight">
                {sector.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <CTAButton to="/sectors" variant="secondary">Explore All Sectors</CTAButton>
        </div>
      </div>
    </section>
  )
}
// ─── Mission CTA ───────────────────────────────────────────────────────────
function MissionCTA() {
  const ref = useScrollReveal()

  // 🔧 Scroll to top function (safe, local scope)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <section
      ref={ref}
      className="reveal relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden"
      style={{
        backgroundImage: "url('/IndiTechHome.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay <div className="absolute inset-0 bg-black/70"></div> */}
      

      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-6">
          Indigenous Technology
        </p>

        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Built for India.<br />Ready for the World.
        </h2>

        <p className="text-muted text-lg leading-relaxed mb-10">
          From autonomous UAV swarms to AI-powered command systems, Vayuron is designing
          the next generation of defence and industrial technology — rooted in indigenous
          engineering excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton to="/about" variant="primary">
            Our Story
          </CTAButton>

          <CTAButton to="/contact" variant="secondary">
            Partner With Us
          </CTAButton>
        </div>

        {/* 🔻 NEW: Vayuron Advanced System Bottom Icon */}
        {/* 🔻 FIXED: Vayuron Advanced System Click */}
<button
  type="button"
  onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }}
  className="mt-12 flex flex-col items-center justify-center mx-auto text-cyan hover:text-white transition-all duration-300 group"
  style={{ position: 'relative', zIndex: 20 }}
>
  <div className="text-xs tracking-[0.3em] uppercase group-hover:scale-105 transition-transform">
    Vayuron Advanced System
  </div>

  <div className="w-2 h-2 bg-cyan rounded-full mt-2 group-hover:shadow-cyan"></div>
</button>

      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Vayuron Advanced Systems — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Vayuron Advanced Systems builds autonomous UAVs, AI platforms, and defence-grade software for critical national and industrial operations."
        />
      </Helmet>

      <main>
        <Hero />
        <StatsBar />
        <ProductsPreview />
        <SectorsPreview />
        <MissionCTA />
      </main>
    </>
  )
}