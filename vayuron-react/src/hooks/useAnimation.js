import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger)

// ─── Lenis Smooth Scroll Setup ────────────────────────────────────────────
// Call this once at the App level. Returns the lenis instance.
export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,           // How long a scroll gesture takes (seconds)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })

      lenisRef.current = lenis

      // Connect Lenis to GSAP ScrollTrigger so they work together
      lenis.on('scroll', ScrollTrigger.update)

      // GSAP ticker drives Lenis animation frame
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    })

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        gsap.ticker.remove()
      }
    }
  }, [])

  return lenisRef
}

// ─── GSAP ScrollTrigger Pin + Parallax ───────────────────────────────────
// Attach a parallax effect to any element on scroll
export function useParallax(speed = 0.4) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = gsap.to(el, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,        // Ties animation to scroll position exactly
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed])

  return ref
}

// ─── GSAP Text Reveal — word by word ─────────────────────────────────────
// Splits text into words and animates each one in with a stagger
export function useTextReveal(options = {}) {
  const ref = useRef(null)
  const { delay = 0, stagger = 0.04, duration = 0.7, once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Split text into word spans
    const originalText = el.textContent
    const words = originalText.split(' ')
    el.innerHTML = words
      .map(word => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.25em"><span class="word" style="display:inline-block;transform:translateY(110%)">${word}</span></span>`)
      .join('')

    const wordEls = el.querySelectorAll('.word')

    const tween = gsap.to(wordEls, {
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      el.textContent = originalText
    }
  }, [delay, stagger, duration, once])

  return ref
}

// ─── GSAP Fade Up with ScrollTrigger ─────────────────────────────────────
// Smoother, GSAP-powered version of the CSS scroll reveal
export function useGSAPReveal(options = {}) {
  const ref = useRef(null)
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = 'power3.out',
    start = 'top 88%',
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Target children if stagger is set, otherwise target the element itself
    const targets = stagger > 0 ? el.children : el

    gsap.set(targets, { y, opacity })

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, opacity, duration, delay, stagger, ease, start])

  return ref
}

// ─── GSAP Counter with ScrollTrigger ─────────────────────────────────────
export function useGSAPCounter(target, suffix = '', duration = 2) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { value: 0 }

    const tween = gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => setDisplay(Math.round(obj.value)),
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [target, duration])

  return { ref, display, suffix }
}

// ─── GSAP Horizontal Scroll Section ──────────────────────────────────────
// Pins a section and scrolls its children horizontally
export function useHorizontalScroll() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return { containerRef, trackRef }
}

// ─── Magnetic Button Effect ───────────────────────────────────────────────
// Makes a button subtly follow the cursor when hovered
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}

// ─── Glitch Text Effect ───────────────────────────────────────────────────
export function useGlitch() {
  const ref = useRef(null)
  const chars = '!<>-_\\/[]{}—=+*^?#@$%'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const original = el.textContent
    let interval = null

    const startGlitch = () => {
      let iterations = 0
      interval = setInterval(() => {
        el.textContent = original
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iterations) return original[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
        if (iterations >= original.length) clearInterval(interval)
        iterations += 0.4
      }, 30)
    }

    const stopGlitch = () => {
      clearInterval(interval)
      el.textContent = original
    }

    el.addEventListener('mouseenter', startGlitch)
    el.addEventListener('mouseleave', stopGlitch)

    return () => {
      el.removeEventListener('mouseenter', startGlitch)
      el.removeEventListener('mouseleave', stopGlitch)
      clearInterval(interval)
    }
  }, [])

  return ref
}

export { gsap, ScrollTrigger }
