import { useRef, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const BannerCanvas = lazy(() =>
  import('../three/HeroCanvas').then(m => ({ default: m.BannerCanvas }))
)

// ─── Breadcrumb ────────────────────────────────────────────────────────────
function Crumbs({ crumbs = [] }) {
  return (
    <nav className="flex items-center gap-2 font-mono text-xs text-dim mb-6">
      <Link to="/" className="hover:text-cyan transition-colors">Home</Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="opacity-40">/</span>
          {i === crumbs.length - 1
            ? <span className="text-muted">{c.label}</span>
            : <Link to={c.path} className="hover:text-cyan transition-colors">{c.label}</Link>
          }
        </span>
      ))}
    </nav>
  )
}

// ─── Parallax Banner ───────────────────────────────────────────────────────
export default function ParallaxBanner({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  show3D = true,
}) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    // Parallax: content moves up at half scroll speed
    const tween = gsap.to(content, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 overflow-hidden bg-surface border-b border-[rgba(0,212,255,0.1)]"
      style={{ minHeight: '320px' }}
    >
      {/* 3D Canvas background */}
      {show3D && (
        <div className="absolute inset-0 z-0 opacity-40">
          <Suspense fallback={<div className="w-full h-full grid-overlay" />}>
            <BannerCanvas />
          </Suspense>
        </div>
      )}

      {/* CSS Grid fallback / overlay */}
      {!show3D && <div className="absolute inset-0 grid-overlay opacity-30 z-0" />}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/40 to-surface/80 z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30 z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-10 z-20" />

      {/* Content */}
      <div ref={contentRef} className="relative z-20 max-w-[1400px] mx-auto px-6">
        <Crumbs crumbs={crumbs} />

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-4"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white mb-4 leading-none"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted text-lg max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
