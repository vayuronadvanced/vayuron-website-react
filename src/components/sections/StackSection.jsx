{/*StackSection.jsx*/}

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
        className="relative w-full h-screen max-h-screen overflow-y-auto will-change-transform"
      >
        {children}
      </div>
    </section>
  )
}
