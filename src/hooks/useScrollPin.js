{/*useScrollPin.js*/}

import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Pins a section in the viewport and scrubs a GSAP timeline against
 * scroll progress — the primitive behind Hanwha/McAlpine-style
 * scroll-driven transitions.
 *
 * Usage (unchanged from existing call sites):
 *   const ref = useScrollPin((tl, el) => {
 *     tl.to(el.querySelector('[data-x]'), { ... }, 0)
 *   })
 *
 * Internally: pins + scrubs on desktop (>=768px), skips the pin on
 * mobile (still scrubs the same timeline as the section passes through
 * the viewport, just without locking scroll), and jumps straight to the
 * end state with no animation if the OS has reduced motion enabled.
 *
 * @param {(tl: gsap.core.Timeline, el: HTMLElement) => void} buildTimeline
 * @param {string} [pinDistance='+=100%'] ScrollTrigger `end` value for the
 *   desktop pin — how much scroll distance the pin holds for.
 * @param {any[]} [deps=[]] Effect dependency array (e.g. image loaded state).
 * @returns {React.RefObject<HTMLElement>} ref to attach to the section root.
 */
export function useScrollPin(buildTimeline, pinDistance = '+=100%', deps = []) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const el = sectionRef.current
    if (!el || typeof buildTimeline !== 'function') return undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions

          if (reduceMotion) {
            // Skip animation entirely — render the end state immediately.
            const tl = gsap.timeline()
            buildTimeline(tl, el)
            tl.progress(1)
            return undefined
          }

          if (isDesktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: pinDistance,
                scrub: 0.1,
                pin: true,
                anticipatePin: 1,
              },
            })
            buildTimeline(tl, el)
            return undefined
          }

          // Mobile: same timeline, no pin — scrubs as the section
          // passes through the viewport instead of locking scroll.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 10%',
              scrub: 1,
            },
          })
          buildTimeline(tl, el)
          return undefined
        }
      )

      return () => mm.revert()
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return sectionRef
}
