{/*StackSection.jsx*/ }

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StackSection({
  children,
  index = 0,
  className = '',
  dim = true,
}) {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)
  const overlayRef = useRef(null)

  useLayoutEffect(() => {
    const el = sectionRef.current
    const inner = innerRef.current
    const overlay = overlayRef.current
    if (!el || !inner || !dim) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return undefined

    // Mobile: skip the scroll-scrubbed scale/dim/tint animation. Recomputing
    // this on every scroll-frame, on top of GSAP ScrollTrigger having to
    // fight the mobile browser's dynamic viewport (address bar show/hide
    // changing 100vh mid-scroll), is what made mobile scrolling feel janky.
    // The section still stacks the same way visually (CSS `position: sticky`
    // below is untouched) — only this extra per-frame animation is skipped.
    // Desktop is completely unaffected.
    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches
    if (isMobileViewport) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3, // low = fast, quick scrolls snap through immediately
        },
      })

      // Scale/brightness/opacity dim — deliberately resolves by 60% of this
      // section's scroll-out range (i.e. shortly after the incoming section
      // has covered ~half the viewport), so it clearly reads as "background"
      // well before it's fully scrolled away, then holds that state.
      tl.fromTo(
        inner,
        { scale: 1, opacity: 1, filter: 'brightness(1)' },
        { scale: 0.88, opacity: 0.85, filter: 'brightness(0.3)', ease: 'none', duration: 0.6 },
        0
      )

      // Subtle blue tint, fading in over the same window and capped low so
      // it reads as a tint rather than a solid wash.
      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 0.45, ease: 'none', duration: 0.6 },
        0
      )
    }, el)

    return () => ctx.revert()
  }, [dim])

  return (
    <section
      ref={sectionRef}
      className={`stack-section relative w-full overflow-hidden bg-black ${className}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: index,
        isolation: 'isolate',
      }}
    >
      <div
        ref={innerRef}
        className="stack-section-inner relative w-full h-screen max-h-screen overflow-hidden will-change-transform"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        {children}
        {dim && (
          <div
            ref={overlayRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background: 'linear-gradient(to bottom,#000,#000)',
              opacity: 0,
            }}
          />
        )}
      </div>
    </section>
  )
}