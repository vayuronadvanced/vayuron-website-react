{/*HomePage.jsx*/ }

import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { SectionHeader, CTAButton, InfoCard, CardGrid } from '../components/ui'
import { PRODUCTS, SECTORS } from '../data/siteData'
import { useScrollReveal } from '../hooks'
import StackSection from '../components/sections/StackSection'

// ─── Hero Section ──────────────────────────────────────────────────────────
function Hero() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black pt-24 pb-24">
      {/* Drone Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        {prefersReducedMotion ? (
          <img
            src="/images/hero-poster.jpg"
            alt="Vayuron autonomous drone in flight"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            aria-label="Vayuron autonomous drone in flight"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/Drone1.mp4" type="video/mp4" />   {/*Section 1 Hero video */}
          </video>
        )}
      </div>

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
          <CTAButton to="/products" variant="primary">
            Explore Products
          </CTAButton>
          <CTAButton to="/about" variant="secondary">
            Our Mission
          </CTAButton>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Products Preview ──────────────────────────────────────────────────────
function ProductsPreview() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-12 bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/rectors.png')",  //Section 2
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 py-16">
        <SectionHeader
          eyebrow="Capabilities"
          title="Our Product Lines"
          subtitle="Four core technology domains engineered for defence, security, & industrial operations."
        />

        <CardGrid>
          {PRODUCTS.map((product) => (
            <InfoCard
              key={product.id}
              to={product.path}
              icon={product.icon}
              title={product.label}
              description={product.description}
              bullets={product.bullets}
            />
          ))}
        </CardGrid>

        <div className="text-center mt-6">
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
        backgroundImage: "url('/Operational.png')",  // Section 3
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-16">
        <SectionHeader
          eyebrow="Sectors"
          title="Operational Domains"
          subtitle="Delivering autonomous intelligence across eight critical industries."
        />

        <CardGrid gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SECTORS.map((sector) => (
            <InfoCard
              key={sector.id}
              to={sector.path}
              icon={sector.icon}
              title={sector.label}
              description={sector.description}
              bullets={sector.bullets}
              className="p-5"
            />
          ))}
        </CardGrid>

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
    <section
      ref={ref}
      className="reveal relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden"
      style={{
        backgroundImage: "url('/IndiTechHome.png')",  //  Section 4 
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
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

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

      {/* Stacked scroll transitions: each StackSection pins in place
          (position: sticky) while the next one scrolls up to cover it.
          Give each an increasing index — that's what makes the stacking
          order correct. Smooth scroll (Lenis) is provided globally in
          App.jsx — do not add SmoothScrollProvider here. */}
      <main>
        <StackSection index={0}>
          <Hero />
        </StackSection>
        <StackSection index={1}>
          <ProductsPreview />
        </StackSection>
        <StackSection index={2}>
          <SectorsPreview />
        </StackSection>
        <StackSection index={3} dim={false}>
          <MissionCTA />
        </StackSection>
      </main>
    </>
  )
}
