{/*index.jsx*/ }

import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSyncExternalStore, useId } from 'react'
import { useScrollReveal, useStatCounter, useIsMobile } from '../../hooks'
import { getExpandedCardId, subscribeExpandedCard, toggleExpandedCardId } from '../../lib/expandableCardStore'

// ─── Breadcrumb ────────────────────────────────────────────────────────────
export function Breadcrumb({ crumbs = [] }) {
  return (
    <nav className="flex items-center gap-2 font-mono text-xs text-muted mb-6" aria-label="Breadcrumb">
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
// Renders the hero/banner content only — no internal ScrollTrigger pin.
// If a page wants the pin/cover stacking effect on its banner, wrap this
// in <StackSection index={0}> from the calling page, same as any other
// section. Keeping this component pin-free avoids double-pinning when
// it's nested inside StackSection's own sticky wrapper.
// Infers the correct <source type="..."> from the file's actual extension
// rather than trusting which prop (backgroundVideoMp4 vs backgroundVideoWebm)
// it was passed into — every current call site in this codebase passes a
// .webm file into backgroundVideoMp4 (naming mismatch, not a format choice),
// and a hardcoded type="video/mp4" on an actual .webm file is a real MIME
// mismatch: browsers use the `type` attribute to decide whether to even
// fetch a <source> at all, so this could cause the browser to skip or
// reject a source that would otherwise have played fine.
export function videoMimeType(src) {
  if (!src) return undefined
  const ext = src.split('.').pop().toLowerCase()
  return { webm: 'video/webm', mp4: 'video/mp4', mov: 'video/quicktime' }[ext] || undefined
}

export function PageBanner({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  backgroundImage,      // used as: (a) poster / reduced-motion fallback when video props are given, (b) plain background when they aren't
  backgroundVideoMp4,    // optional, e.g. "/videos/technology-banner.mp4"
  backgroundVideoWebm,   // optional, e.g. "/videos/technology-banner.webm"
}) {
  const hasVideo = Boolean(backgroundVideoMp4 || backgroundVideoWebm)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const showVideo = hasVideo && !prefersReducedMotion

  return (
    <section
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
        <div className="absolute inset-0 overflow-hidden">
          {showVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={backgroundImage}
              aria-hidden="true"
            >
              {backgroundVideoWebm && <source src={backgroundVideoWebm} type={videoMimeType(backgroundVideoWebm)} />}
              {backgroundVideoMp4 && <source src={backgroundVideoMp4} type={videoMimeType(backgroundVideoMp4)} />}
            </video>
          ) : (
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* Cyan glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <Breadcrumb crumbs={crumbs} />

        {eyebrow && (
          <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-muted text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Section Header ────────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, centered = false, className = '', as: Tag = 'h2' }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${centered ? 'text-center' : ''} ${className || 'mb-8'}`}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">{eyebrow}</p>
      )}
      <Tag className="font-display text-3xl md:text-4xl font-bold text-white mb-3">{title}</Tag>
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
    secondary: 'border border-cyan text-cyan hover:bg-cyan hover:text-black',
    ghost: 'border border-cyan text-cyan hover:bg-cyan hover:text-black',
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
      <div className="flex-1 h-px bg-[rgba(0,212,255,0.1)]" />
      <div className="w-1 h-1 rounded-full bg-cyan" />
      <div className="flex-1 h-px bg-[rgba(0,212,255,0.1)]" />
    </div>
  )
}

// ─── Info Card (standardized card — use this everywhere) ─────────────────
// One card component for the whole site: same size/shape, same hover
// animation, same heading font, same description style, and an equal
// number of bullets per card within a given grid (pass the same-length
// `bullets` arrays for every card in a section).
export function InfoCard({ icon, title, description, bullets = [], to, href, className = '' }) {
  // Mobile (< sm): tighter padding so more cards fit per viewport without
  // feeling cramped. sm: and up restore the original desktop/tablet p-6 —
  // desktop look is completely unchanged.
  const hasDescription = Boolean(description) || bullets.length > 0
  const isMobile = useIsMobile()
  const cardId = useId()

  // Only cards that actually have a description/bullets on desktop ever
  // enter the mobile expand/collapse behavior — cards without one render
  // through the exact original (unchanged) path below regardless of
  // viewport, per spec ("cards without desktop descriptions must remain
  // unchanged").
  const expandableOnMobile = hasDescription && isMobile

  const expandedId = useSyncExternalStore(
    subscribeExpandedCard,
    getExpandedCardId,
    () => null // SSR/prerender snapshot: nothing expanded
  )
  const isExpanded = expandableOnMobile && expandedId === cardId

  const cls = `group relative flex h-full flex-col overflow-hidden rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-4 sm:p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 ${isExpanded ? '-translate-y-1 border-cyan/50 bg-black/30' : ''} ${className}`

  const headerContent = (
    <>
      {/* Top Accent Line — same on every card */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />

      {icon && (
        <span className="text-cyan text-xl sm:text-2xl mb-2 sm:mb-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}

      <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-0 sm:mb-3 group-hover:text-cyan transition-colors">
        {title}
      </h3>
    </>
  )

  // Desktop/tablet (sm and up) description + bullets — always rendered,
  // exactly as before. Separate from the mobile expandable block below so
  // the `sm:` breakpoint keeps working purely in CSS with no JS branching.
  const staticDescriptionBlock = hasDescription && (
    <>
      {description && (
        <p className="hidden sm:block text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors mb-4">
          {description}
        </p>
      )}
      {bullets.length > 0 && (
        <ul className="hidden sm:block space-y-2 mb-4">
          {bullets.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-white/70 text-[13px] leading-relaxed group-hover:text-white/90 transition-colors"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  )

  // Mobile-only expandable description + bullets, revealed on tap with a
  // smooth height animation. Only mounted at all when this card both has a
  // description and the viewport is mobile, so desktop/tablet never pay for
  // or render any of this.
  const mobileExpandableBlock = expandableOnMobile && (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          key="mobile-description"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="sm:hidden overflow-hidden"
        >
          <div className="pt-3">
            {description && (
              <p className="text-white/75 text-sm leading-relaxed mb-4">{description}</p>
            )}
            {bullets.length > 0 && (
              <ul className="space-y-2 mb-4">
                {bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/70 text-[13px] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const learnMoreLink = (to || href) && (
    <>
      {/* Desktop/tablet: same inline non-interactive label as before
          (whole card is already the link there). */}
      <span className="hidden sm:inline-flex mt-auto items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan group-hover:text-white transition-colors">
        Learn More
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>

      {/* Mobile: only a real, tappable navigation target once the card is
          expanded — stops propagation so it doesn't just re-toggle the
          card, and is the only way to navigate from an expandable card on
          mobile (tapping the heading toggles expand/collapse instead). */}
      {expandableOnMobile && isExpanded && (
        to ? (
          <Link
            to={to}
            onClick={(e) => e.stopPropagation()}
            className="sm:hidden mt-auto inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan"
          >
            Learn More
            <span>→</span>
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="sm:hidden mt-auto inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan"
          >
            Learn More
            <span>→</span>
          </a>
        )
      )}
    </>
  )

  const content = (
    <>
      {headerContent}
      {staticDescriptionBlock}
      {mobileExpandableBlock}
      {learnMoreLink}
    </>
  )

  // Cards with no description are untouched: same Link/a/div as before,
  // on every viewport.
  if (!hasDescription) {
    if (to) return <Link to={to} className={cls}>{content}</Link>
    if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
    return <div className={cls}>{content}</div>
  }

  // Desktop/tablet with a description: unchanged — whole card stays the
  // Link/a/div it always was.
  if (!isMobile) {
    if (to) return <Link to={to} className={cls}>{content}</Link>
    if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
    return <div className={cls}>{content}</div>
  }

  // Mobile with a description: the card itself is a tap target that
  // toggles expand/collapse (never a navigating Link/a — navigation only
  // happens via the explicit "Learn More" link once expanded), and
  // collapses any other expanded card site-wide.
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={() => toggleExpandedCardId(cardId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleExpandedCardId(cardId)
        }
      }}
      className={cls}
    >
      {content}
    </div>
  )
}

// ─── Expandable Mobile Card (shared helper) ────────────────────────────────
// Reusable pieces so any hand-rolled card section (not just InfoCard) can
// get the same "tap heading to reveal description, only one open at a time"
// mobile behavior without duplicating the store-wiring logic. Desktop/
// tablet callers simply never render ExpandableReveal's content (it's
// mobile-only by className), so nothing here touches desktop markup.
export function useExpandableMobileCard(breakpoint = 640) {
  const isMobile = useIsMobile(breakpoint)
  const cardId = useId()
  const expandedId = useSyncExternalStore(
    subscribeExpandedCard,
    getExpandedCardId,
    () => null // SSR/prerender snapshot: nothing expanded
  )
  const isExpanded = isMobile && expandedId === cardId
  const toggle = () => toggleExpandedCardId(cardId)
  return { isMobile, isExpanded, toggle, cardId }
}

// breakpointClass controls which viewport this reveal is confined to —
// pass the inverse of whatever "hidden X:block" class the section already
// uses for its always-rendered desktop copy (e.g. sections hiding desktop
// content below `md:` should pass 'md:hidden' here).
export function ExpandableReveal({ expanded, breakpointClass = 'sm:hidden', className = '', children }) {
  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`${breakpointClass} overflow-hidden`}
        >
          <div className={`pt-2 ${className}`}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
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
        ${hover
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
        <div className="loading-bar-fill" />
      </div>
      <div className="font-mono text-xs text-muted tracking-widest uppercase">
        Initialising Systems...
      </div>
    </motion.div>
  )
}
export { CardGrid, CardGridWithRef } from './CardGrid'