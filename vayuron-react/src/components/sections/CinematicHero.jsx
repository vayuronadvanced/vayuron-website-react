import { useRef, useEffect, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lazy-load the 3D canvas — only loads when component mounts
const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

// ─── Scroll Indicator ──────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-dim">Scroll</span>
      <div className="relative w-px h-14 bg-dim overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-cyan"
          animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}

// ─── Tag Line Glitch Char Animation ───────────────────────────────────────
function GlitchWord({ children, delay = 0 }) {
  const ref = useRef(null)
  const chars = '!<>-_\\/[]{}—=+*^?#@$%'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const original = el.textContent
    let interval = null
    let iterations = 0

    const start = () => {
      iterations = 0
      interval = setInterval(() => {
        el.textContent = original
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iterations) return original[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
        if (iterations >= original.length) clearInterval(interval)
        iterations += 0.5
      }, 28)
    }

    // Auto-play on mount after delay
    const timer = setTimeout(start, delay)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      el.textContent = original
    }
  }, [delay])

  return <span ref={ref}>{children}</span>
}

// ─── Main Cinematic Hero ───────────────────────────────────────────────────
export default function CinematicHero({
  title,
  titleAccent,
  subtitle,
  eyebrow,
  primaryCTA = { label: 'Explore Products', to: '/products' },
  secondaryCTA = { label: 'Our Mission', to: '/about' },
  variant = 'home',   // 'home' | 'page'
}) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)

  // Parallax: as user scrolls down, the hero content moves up slowly
  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const tween = gsap.to(content, {
      y: -120,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Fade the dark overlay as user scrolls — reveals more of the 3D canvas
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
      })
    }

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── 3D Canvas Layer ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          // Fallback while the 3D canvas loads — shows the animated CSS grid
          <div className="w-full h-full grid-overlay animate-pulse-slow" />
        }>
          <HeroCanvas variant={variant === 'home' ? 'full' : 'minimal'} />
        </Suspense>
      </div>

      {/* ── Gradient Overlays ── */}
      {/* Bottom gradient — fades 3D into the page content below */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      {/* Left vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20 z-10 pointer-events-none" />
      {/* Subtle dark overlay for text readability (fades on scroll) */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      {/* ── Top Edge Decoration ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40 z-20" />

      {/* ── Hero Content ── */}
      <div ref={contentRef} className="relative z-20 text-center px-6 max-w-6xl mx-auto">

        {/* Eyebrow — military-style designation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-cyan opacity-60" />
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-cyan">
            {eyebrow || 'Defence · Aerospace · Autonomous Systems'}
          </p>
          <div className="h-px w-12 bg-cyan opacity-60" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          {title && (
            <span className="block text-white">
              <GlitchWord delay={800}>{title}</GlitchWord>
            </span>
          )}
          {titleAccent && (
            <span
              className="block text-cyan"
              style={{ textShadow: '0 0 60px rgba(0,212,255,0.4)' }}
            >
              <GlitchWord delay={1100}>{titleAccent}</GlitchWord>
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to={primaryCTA.to}
            className="group relative border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all duration-300 px-8 py-3.5 font-mono text-xs tracking-widest uppercase overflow-hidden"
          >
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <span className="relative">{primaryCTA.label}</span>
          </Link>
          <Link
            to={secondaryCTA.to}
            className="border border-dim text-muted hover:border-muted hover:text-white transition-all duration-300 px-8 py-3.5 font-mono text-xs tracking-widest uppercase"
          >
            {secondaryCTA.label}
          </Link>
        </motion.div>

        {/* System status bar — military HUD aesthetic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap"
        >
          {[
            { label: 'System', value: 'ONLINE' },
            { label: 'Status', value: 'OPERATIONAL' },
            { label: 'Clearance', value: 'OPEN' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="font-mono text-[10px] text-dim tracking-widest uppercase">{item.label}</span>
              <span className="font-mono text-[10px] text-cyan tracking-widest">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}
