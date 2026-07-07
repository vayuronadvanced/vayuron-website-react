{/*ScrollToTop.jsx*/}

import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../../context/LenisContext'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      // Reduced-motion path, or Lenis not yet initialized on first mount.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, lenis])

  return null
}
