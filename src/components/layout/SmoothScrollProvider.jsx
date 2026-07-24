{/*SmoothScrollProvider.jsx*/}

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisContext } from '../../context/LenisContext';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Mobile/touch viewports: skip Lenis entirely and let the browser's
    // native touch scrolling handle everything. Lenis's synthetic scroll
    // physics plus the wheel-only section-snap handler below are a
    // desktop (mouse wheel) affordance — they do nothing useful on touch
    // input, and layering Lenis's scroll interpolation on top of native
    // touch scroll + GSAP ScrollTrigger pinning is what was making mobile
    // scrolling feel janky/unreliable. Desktop (>= 768px, mouse/wheel)
    // keeps the exact same Lenis + snap behavior as before.
    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;

    if (prefersReducedMotion || isMobileViewport) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // =========================
    // SNAP SCROLL LOGIC
    // =========================

    let isScrolling = false;

    const sections = Array.from(document.querySelectorAll('section'));

    const getClosestSection = () => {
      const scroll = window.scrollY;
      let closest = sections[0];
      let minDist = Infinity;

      sections.forEach((section) => {
        const offset = Math.abs(section.offsetTop - scroll);
        if (offset < minDist) {
          minDist = offset;
          closest = section;
        }
      });

      return closest;
    };

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;
      const current = getClosestSection();
      const index = sections.indexOf(current);

      let targetIndex = index + direction;

      if (targetIndex < 0) targetIndex = 0;
      if (targetIndex >= sections.length) targetIndex = sections.length - 1;

      isScrolling = true;

      lenis.scrollTo(sections[targetIndex], {
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          isScrolling = false;
        },
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}