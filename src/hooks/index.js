{/*index.js*/}

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, trackPageview } from '../lib/googleAnalytics'

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────
// Replaces js/scroll-reveal.js
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

// ─── Scroll Progress Hook ──────────────────────────────────────────────────
// Replaces scroll progress bar from js/animations.js
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

// ─── Custom Cursor Hook ────────────────────────────────────────────────────
// Replaces js/cursor.js
export function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const enter = () => setHovering(true)
    const leave = () => setHovering(false)

    window.addEventListener('mousemove', move)
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return { pos, hovering }
}

// ─── Stat Counter Hook ─────────────────────────────────────────────────────
// Replaces count-up from js/animations.js
export function useStatCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el)
          const start = performance.now()
          const step = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

// ─── Loading Screen Hook ───────────────────────────────────────────────────
export function useLoadingScreen(minDuration = 1500) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), minDuration)
    return () => clearTimeout(timer)
  }, [minDuration])

  return isLoading
}

// ─── API Hook (Phase 3.1) ──────────────────────────────────────────────────
// Consistent { data, loading, error, run } shape for any API call, so every
// component that calls the backend handles loading/error the same way.
//
// Usage:
//   const { data, loading, error, run } = useApi(getBlogPosts)
//   useEffect(() => { run() }, [run])
//
// For form submissions, call run(payload) directly in the submit handler
// instead of on mount.
export function useApi(apiFn) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiFnRef = useRef(apiFn)
  apiFnRef.current = apiFn

  const run = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFnRef.current(...args)
      setData(result)
      return result
    } catch (err) {
      // Surface the backend's validation message when available (DRF
      // typically returns { field: ["message"] } or { detail: "message" }),
      // falling back to a generic message otherwise.
      const backendData = err?.response?.data
      const message =
        backendData?.detail ||
        (backendData && typeof backendData === 'object'
          ? Object.values(backendData).flat().join(' ')
          : null) ||
        err.message ||
        'Something went wrong. Please try again.'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, run }
}

// ─── Google Analytics Pageview Tracking ────────────────────────────────────
// Call once, high in the component tree (App.jsx). Initializes GA on mount
// (no-ops if VITE_GA_MEASUREMENT_ID isn't set) and fires a page_view event
// on every route change, since GA's own automatic pageview tracking doesn't
// work correctly for a client-side-routed SPA.
export function useGoogleAnalyticsPageviews() {
  const location = useLocation()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    trackPageview(location.pathname + location.search)
  }, [location])
}
