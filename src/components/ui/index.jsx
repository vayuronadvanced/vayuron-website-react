import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal, useStatCounter } from '../../hooks'

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
  backgroundImage // ✅ NEW PROP
}) {
  return (
    <section
      className="relative border-b border-[rgba(0,212,255,0.1)] pt-32 pb-16 overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* DARK OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Cyan glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Breadcrumb crumbs={crumbs} />

        {eyebrow && (
          <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-muted text-lg max-w-2xl leading-relaxed">
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
    <div ref={ref} className={`reveal ${centered ? 'text-center' : ''} ${className || 'mb-12'}`}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed">
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