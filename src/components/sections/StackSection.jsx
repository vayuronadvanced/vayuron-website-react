import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps a full-viewport section so it "pins" in place while the NEXT
 * StackSection scrolls up and covers it — the Hanwha/Apple-style
 * stacked section transition.
 *
 * How it works: position: sticky + top: 0 does the actual pinning and
 * covering for free (later sections in the DOM naturally paint over
 * earlier ones as they reach the top of the viewport, no GSAP pin
 * needed). GSAP only adds a subtle scale-down + dim on the OUTGOING
 * section as it gets covered, for the depth/parallax feel — driven by
 * a short scrub so a quick scroll snaps straight through instead of
 * dragging.
 *
 * IMPORTANT: give each StackSection on a page an increasing `index`
 * (0, 1, 2, ...) in DOM order — that's what makes later sections stack
 * visually above earlier ones.
 *
 * Usage:
 *   <StackSection index={0}><Hero /></StackSection>
 *   <StackSection index={1}><ProductsPreview /></StackSection>
 */
export default function StackSection({
  children,
  index = 0,
  className = '',
  dim = true,
}) {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)

  useLayoutEffect(() => {
    const el = sectionRef.current
    const inner = innerRef.current
    if (!el || !inner || !dim) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { scale: 1, filter: 'brightness(1)' },
        {
          scale: 0.94,
          filter: 'brightness(0.55)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.3, // low = fast, quick scrolls snap through immediately
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [dim])

  return (
    <section
      ref={sectionRef}
      className={`stack-section relative w-full ${className}`}
      style={{ position: 'sticky', top: 0, zIndex: index }}
    >
      <div
        ref={innerRef}
        className="relative w-full min-h-screen will-change-transform"
      >
        {children}
      </div>
    </section>
  )
}
