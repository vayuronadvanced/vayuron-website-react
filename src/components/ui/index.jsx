import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal, useStatCounter } from '../../hooks'
import { useScrollPin } from '../../hooks/useScrollPin'

// ─── Breadcrumb ────────────────────────────────────────────────────────────
export function Breadcrumb({ crumbs = [] }) {
  return (
    <nav className="flex items-center gap-2 font-mono text-xs text-dim mb-6" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-muted transition-colors">Home</Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>/</span>
          {i === crumbs.length - 1 ? (
            <span className="text-muted">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-muted transition-colors">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}

// ─── Page Banner ───────────────────────────────────────────────────────────
export function PageBanner({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  backgroundImage,      // used as: (a) poster / reduced-motion fallback when video props are given, (b) plain background when they aren't
  backgroundVideoMp4,    // ✅ NEW — optional, e.g. "/videos/technology-banner.mp4"
  backgroundVideoWebm,   // ✅ NEW — optional, e.g. "/videos/technology-banner.webm"
}) {
  const hasVideo = Boolean(backgroundVideoMp4 || backgroundVideoWebm)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const showVideo = hasVideo && !prefersReducedMotion

  // Same pinned reveal used on the homepage Hero — pins the banner while
  // the media scales/clips in and the text content fades up and out.
  // Only pins when there's a video background; plain-image banners keep
  // their original static behavior so existing pages don't shift
  // unexpectedly until you opt them into video.
  const bannerRef = useScrollPin((tl, el) => {
    const mediaWrapper = el.querySelector('[data-banner-wrapper]')
    const media = el.querySelector('[data-banner-media]')
    const content = el.querySelector('[data-banner-content]')

    if (!mediaWrapper || !media) return

    tl.to(mediaWrapper, { clipPath: 'inset(6% 6% 6% 6% round 28px)', ease: 'none' }, 0)
      .to(media, { scale: 1.15, ease: 'none' }, 0)
      .to(content, { opacity: 0, y: -80, ease: 'none' }, 0)
  })

  return (
    <section
      ref={hasVideo ? bannerRef : null}
      className="relative min-h-screen flex items-center border-b border-[rgba(0,212,255,0.1)] overflow-hidden"
      style={
        !hasVideo
          ? {
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      {hasVideo && (
        <div data-banner-wrapper className="absolute inset-0 overflow-hidden">
          {showVideo ? (
            <video
              data-banner-media
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={backgroundImage}
              aria-hidden="true"
            >
              {backgroundVideoWebm && <source src={backgroundVideoWebm} type="video/webm" />}
              {backgroundVideoMp4 && <source src={backgroundVideoMp4} type="video/mp4" />}
            </video>
          ) : (
            <img
              data-banner-media
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* DARK OVERLAY FOR READABILITY : <div className="absolute inset-0 bg-black/60" />*/}
      

      {/* Cyan glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

      <div
        data-banner-content
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-32 pb-24"
      >
        <Breadcrumb crumbs={crumbs} />

        {eyebrow && (
          <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Section Header ────────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, centered = false, className = '' }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${centered ? 'text-center' : ''} ${className || 'mb-8'}`}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      {subtitle && (
        <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed mb-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Stat Counter Card ─────────────────────────────────────────────────────
export function StatCard({ value, suffix = '', label }) {
  const { count, ref } = useStatCounter(value)
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-cyan mb-1">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-muted tracking-widest uppercase">{label}</div>
    </div>
  )
}

// ─── CTA Button ───────────────────────────────────────────────────────────
export function CTAButton({ children, to, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-all duration-200 px-6 py-3'
  const variants = {
    primary: 'border border-cyan text-cyan hover:bg-cyan hover:text-black',
    secondary: 'border border-dim text-muted hover:border-muted hover:text-white',
    ghost: 'text-cyan hover:text-white underline-offset-4 hover:underline',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  return <button className={cls} {...props}>{children}</button>
}

// ─── Divider Line ─────────────────────────────────────────────────────────
export function CyanDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-[rgba(0,212,255,0.1)]"/>
      <div className="w-1 h-1 rounded-full bg-cyan"/>
      <div className="flex-1 h-px bg-[rgba(0,212,255,0.1)]"/>
    </div>
  )
}

// ─── Universal Card ───────────────────────────────────────────────────────
export function Card({
  children,
  className = '',
  hover = true,
  reveal = false,
}) {
  const ref = useScrollReveal()

  return (
    <div
      ref={reveal ? ref : null}
      className={`
        ${reveal ? 'reveal' : ''}
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-[rgba(0,212,255,0.10)]
        bg-black/20
        backdrop-blur-md
        p-6
        transition-all
        duration-300
        ${
          hover
            ? 'hover:border-cyan/40 hover:bg-black/35 hover:-translate-y-1'
            : ''
        }
        ${className}
      `}
    >
      {/* Top Accent Line */}
      <div
        className="
          absolute
          top-0
          left-0
          h-[2px]
          w-0
          bg-cyan
          transition-all
          duration-300
          group-hover:w-full
        "
      />

      {children}
    </div>
  )
}

// ─── Feature Card ─────────────────────────────────────────────────────────
export function FeatureCard({ icon, title, description, className = '' }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`reveal bg-surface border border-[rgba(0,212,255,0.1)] p-6 hover:border-[rgba(0,212,255,0.3)] transition-all duration-300 group ${className}`}
    >
      {icon && <div className="text-cyan text-2xl mb-4">{icon}</div>}
      <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-cyan transition-colors">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  )
}

// ─── Spec Card ────────────────────────────────────────────────────────────
export function SpecCard({ label, value }) {
  return (
    <div className="bg-surface border border-[rgba(0,212,255,0.1)] p-4 hover:border-cyan hover:bg-[rgba(0,212,255,0.03)] transition-all group">
      <div className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-1">{label}</div>
      <div className="font-display font-bold text-white text-xl">{value}</div>
    </div>
  )
}

// ─── Loading Screen ────────────────────────────────────────────────────────
export function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-display text-2xl font-bold tracking-[0.3em] text-white uppercase">
        Vayuron
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill"/>
      </div>
      <div className="font-mono text-xs text-dim tracking-widest uppercase">
        Initialising Systems...
      </div>
    </motion.div>
  )
}
