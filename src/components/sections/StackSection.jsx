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
    if (isMobileViewport) {
      // Lightweight substitute: a single threshold-crossing fade/scale-in
      // instead of a continuous scroll-scrubbed animation. IntersectionObserver
      // only fires on enter/exit (not per scroll frame) and doesn't read
      // scroll position or viewport height at all, so it can't fight the
      // mobile browser's dynamic viewport the way ScrollTrigger did — this
      // is what keeps mobile scrolling smooth while still giving each
      // section a soft entrance instead of popping in instantly.
      // Skip entirely for content already visible on load (e.g. the hero,
      // index 0) — animating those in would delay first paint of
      // above-the-fold content for no visual benefit and could regress LCP.
      const rect = el.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (alreadyVisible) return undefined

      inner.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out'
      inner.style.opacity = '0'
      inner.style.transform = 'translateY(24px)'

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            inner.style.opacity = '1'
            inner.style.transform = 'translateY(0)'
          }
        },
        { threshold: 0.15 }
      )
      io.observe(el)

      return () => io.disconnect()
    }

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