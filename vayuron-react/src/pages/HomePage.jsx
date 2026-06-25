import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import CinematicHero from '../components/sections/CinematicHero'
import ScrollStory from '../components/sections/ScrollStory'
import AnimatedStatsBar from '../components/sections/AnimatedStatsBar'
import HorizontalScroll from '../components/sections/HorizontalScroll'
import MarqueeTicker from '../components/sections/MarqueeTicker'
import { SectionHeader, CTAButton, CyanDivider } from '../components/ui'
import { PRODUCTS, SECTORS } from '../data/siteData'
import { useGSAPReveal, useTextReveal } from '../hooks/useAnimation'

// ─── Story panels for the scroll narrative section ─────────────────────────
const storyPanels = [
  {
    eyebrow: 'The Mission',
    title: 'India's Defence Deserves Indigenous Technology',
    body: 'Every critical operation that depends on foreign black-box technology is a vulnerability. Vayuron builds the autonomous systems, AI platforms, and encrypted communications that give India genuine operational sovereignty — technology designed, manufactured, and supported entirely within the country.',
  },
  {
    eyebrow: 'The Capability',
    title: 'From Sensor to Decision in Milliseconds',
    body: 'Our edge AI systems process electro-optical, infrared, and radar inputs in real time — on embedded hardware that requires no cloud connectivity. In GPS-denied, communications-jammed, and electromagnetically contested environments, Vayuron systems continue to operate autonomously.',
  },
  {
    eyebrow: 'The Platform',
    title: 'UAV Swarms. AI Command. Encrypted Control.',
    body: 'Vayuron\'s integrated architecture links autonomous UAV platforms, AI-powered situational awareness, and encrypted ground control software into a single operational stack. Each element is interoperable, field-maintainable, and purpose-built for Indian operational conditions.',
  },
  {
    eyebrow: 'The Commitment',
    title: 'Deployed. Proven. Continuously Improved.',
    body: 'Every platform Vayuron fields is actively used in real operational environments. Our engineering teams work alongside client operators — gathering feedback, iterating systems, and ensuring that what we build keeps pace with the threat.',
  },
]

// ─── Mission CTA Section ───────────────────────────────────────────────────
function MissionCTA() {
  const titleRef = useTextReveal({ stagger: 0.05, delay: 0.1 })
  const bodyRef = useGSAPReveal({ y: 30, delay: 0.5 })

  return (
    <section className="relative py-40 overflow-hidden bg-black">
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-20" />
      {/* Cyan radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono text-xs tracking-[0.35em] uppercase text-cyan mb-8">
          Built for India · Ready for the World
        </p>

        <h2
          ref={titleRef}
          className="font-display font-bold text-white mb-8 leading-none"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Engineering Indigenous Innovation
        </h2>

        <div ref={bodyRef}>
          <p className="text-muted text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            From autonomous UAV swarms to AI-powered command intelligence,
            Vayuron is defining what indigenous defence technology looks like
            for the next generation of Indian operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/about" variant="primary">Our Story</CTAButton>
            <CTAButton to="/contact" variant="secondary">Partner With Us</CTAButton>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-15" />
    </section>
  )
}

// ─── Sectors Quick Links ───────────────────────────────────────────────────
function SectorsGrid() {
  const ref = useGSAPReveal({ y: 30, stagger: 0.05 })

  return (
    <section className="py-24 bg-surface border-y border-[rgba(0,212,255,0.08)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <SectionHeader
          eyebrow="Operational Domains"
          title="Eight Critical Sectors"
          subtitle="Autonomous intelligence deployed across India's most demanding operational environments."
        />
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SECTORS.map((sector) => (
            <Link
              key={sector.id}
              to={sector.path}
              className="group border border-[rgba(0,212,255,0.06)] hover:border-cyan p-5 transition-all duration-200 flex items-center gap-3 bg-black/30 hover:bg-[rgba(0,212,255,0.03)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-dim group-hover:bg-cyan transition-colors flex-shrink-0" />
              <span className="font-mono text-xs text-muted group-hover:text-white transition-colors leading-tight">
                {sector.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/sectors" variant="secondary">Explore All Sectors</CTAButton>
        </div>
      </div>
    </section>
  )
}

// ─── Home Page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Vayuron Advanced Systems — Engineering Indigenous Innovation</title>
        <meta name="description" content="Vayuron Advanced Systems builds autonomous UAVs, AI platforms, and defence-grade software for critical national and industrial operations." />
        <meta property="og:title" content="Vayuron Advanced Systems" />
        <meta property="og:description" content="Engineering Indigenous Innovation — autonomous UAV, AI, and defence systems." />
      </Helmet>

      <main>
        {/* Phase 3: Cinematic fullscreen hero with 3D canvas */}
        <CinematicHero
          title="Engineering"
          titleAccent="Indigenous Innovation"
          subtitle="Vayuron Advanced Systems builds autonomous UAVs, AI platforms, and defence-grade software for critical national and industrial operations."
          primaryCTA={{ label: 'Explore Products', to: '/products' }}
          secondaryCTA={{ label: 'Our Mission', to: '/about' }}
          variant="home"
        />

        {/* Phase 3: Animated stats bar */}
        <AnimatedStatsBar stats={[
          { value: 8,   suffix: '+',  label: 'Sectors Served' },
          { value: 4,   suffix: '',   label: 'Product Lines' },
          { value: 50,  suffix: '+',  label: 'Deployments' },
          { value: 100, suffix: '+',  label: 'Team Members' },
        ]} />

        {/* Phase 3: Marquee ticker */}
        <MarqueeTicker />

        {/* Phase 3: Horizontal product scroll */}
        <HorizontalScroll
          eyebrow="Capabilities"
          title="Our Product Lines"
          items={PRODUCTS.map(p => ({
            ...p,
            path: p.path,
          }))}
        />

        {/* Phase 3: Scroll-driven story */}
        <ScrollStory panels={storyPanels} />

        {/* Sectors grid */}
        <SectorsGrid />

        {/* Phase 3: Mission CTA with text reveal */}
        <MissionCTA />
      </main>
    </>
  )
}
