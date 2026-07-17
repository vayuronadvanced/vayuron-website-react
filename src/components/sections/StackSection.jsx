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
      className={`stack-section relative w-full overflow-hidden ${className}`}
      style={{ position: 'sticky', top: 0, zIndex: index }}
    >
      <div
        ref={innerRef}
        className="relative w-full h-screen max-h-screen overflow-y-auto will-change-transform"
      >
        {children}
        {dim && (
          <div
            ref={overlayRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20"
            style={{ backgroundColor: 'rgba(8, 20, 60, 1)', opacity: 0 }}
          />
        )}
      </div>
    </section>
  )
}