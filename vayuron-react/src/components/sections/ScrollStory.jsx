import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAPReveal, useTextReveal } from '../../hooks/useAnimation'

gsap.registerPlugin(ScrollTrigger)

// ─── Single Story Panel ────────────────────────────────────────────────────
// Each panel pins, reveals its content, then unpins as the next takes over
function StoryPanel({ eyebrow, title, body, align = 'left', index }) {
  const panelRef = useRef(null)
  const titleRef = useTextReveal({ delay: 0.1, stagger: 0.06 })
  const bodyRef = useGSAPReveal({ y: 30, delay: 0.4 })

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    // Fade panel in when it enters, fade out when leaving
    gsap.fromTo(panel,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 70%',
          once: true,
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <div
      ref={panelRef}
      className={`py-24 md:py-32 px-6 max-w-[1400px] mx-auto flex ${
        align === 'right' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="max-w-xl">
        {/* Step number */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] text-dim tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="h-px w-8 bg-cyan opacity-40" />
          <span className="font-mono text-xs tracking-widest uppercase text-cyan">{eyebrow}</span>
        </div>

        {/* Title with word-reveal */}
        <h2
          ref={titleRef}
          className="font-display font-bold text-white mb-6 leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          {title}
        </h2>

        {/* Body */}
        <div ref={bodyRef}>
          <p className="text-muted leading-relaxed text-lg">{body}</p>
        </div>

        {/* Decorative line */}
        <div className="mt-8 h-px bg-gradient-to-r from-cyan to-transparent opacity-30" />
      </div>
    </div>
  )
}

// ─── Scroll Story Container ────────────────────────────────────────────────
// The section that holds all story panels with a sticky side panel
export default function ScrollStory({ panels = [] }) {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Animate the vertical progress line as user scrolls through panels
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={containerRef} className="relative bg-black">
      {/* Vertical progress line running down the left side */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-[rgba(0,212,255,0.06)] hidden md:block">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full bg-cyan origin-top"
          style={{ height: '100%', transform: 'scaleY(0)' }}
        />
      </div>

      {/* Story panels */}
      {panels.map((panel, i) => (
        <div key={i} className="border-b border-[rgba(0,212,255,0.05)] last:border-b-0">
          <StoryPanel {...panel} index={i} align={i % 2 === 0 ? 'left' : 'right'} />
        </div>
      ))}
    </section>
  )
}
