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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-24 pb-24">      <div className="absolute inset-0 grid-overlay" />
      
      {/* Drone Background Image */}
      <img
        src="/drone-bg.png"
        alt="Drone Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
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
          <span className="text-cyan text-glow-cyan">Advanced</span>
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

      {/* Scroll Indicator 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
      >
        <div className="font-mono text-[10px] tracking-widest uppercase text-dim">Scroll</div>
        <div className="w-px h-12 bg-gradient-to-b from-dim to-transparent animate-pulse-slow" />
      </motion.div>*/}
    </section>
  )
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="reveal bg-surface border-y border-[rgba(0,212,255,0.1)] py-12">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatCard value={8}   suffix="+"  label="Sectors Served" />
        <StatCard value={4}   suffix=""   label="Product Lines" />
        <StatCard value={50}  suffix="+"  label="Deployments" />
        <StatCard value={100} suffix="+"  label="Team Members" />
      </div>
    </section>
  )
}

// ─── Products Preview ──────────────────────────────────────────────────────
function ProductsPreview() {
  return (
    <section className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeader
        eyebrow="Capabilities"
        title="Our Product Lines"
        subtitle="Four core technology domains engineered for defence, security, and industrial operations."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {PRODUCTS.map((product, i) => (
          <Link
            key={product.id}
            to={product.path}
            className="group bg-surface border border-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.35)] p-8 transition-all duration-300 flex items-start gap-4"
          >
            <span className="text-3xl text-cyan mt-1">{product.icon}</span>
            <div>
              <h3 className="font-display text-xl font-semibold text-white group-hover:text-cyan transition-colors mb-2">
                {product.label}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4">{product.description}</p>
              <span className="font-mono text-xs text-cyan group-hover:text-white transition-colors">
                Learn More →
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <CTAButton to="/products" variant="secondary">View All Products</CTAButton>
      </div>
    </section>
  )
}

// ─── Sectors Preview ───────────────────────────────────────────────────────
function SectorsPreview() {
  return (
    <section className="py-24 bg-surface border-y border-[rgba(0,212,255,0.08)]">
      <div className="max-w-[1400px] mx-auto px-6">
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
              <span className="w-1.5 h-1.5 rounded-full bg-dim group-hover:bg-cyan transition-colors flex-shrink-0" />
              <span className="font-mono text-xs text-muted group-hover:text-white transition-colors leading-tight">
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
  return (
    <section ref={ref} className="reveal py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative max-w-3xl mx-auto">
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
          <CTAButton to="/about" variant="primary">Our Story</CTAButton>
          <CTAButton to="/contact" variant="secondary">Partner With Us</CTAButton>
        </div>
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
        <meta name="description" content="Vayuron Advanced Systems builds autonomous UAVs, AI platforms, and defence-grade software for critical national and industrial operations." />
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
