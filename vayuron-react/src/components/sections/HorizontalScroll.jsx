import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Horizontal Scroll Ticker ──────────────────────────────────────────────
// A row of cards that scrolls horizontally as the user scrolls vertically
// Like the SpaceX mission tiles section
export default function HorizontalScroll({ items = [], title, eyebrow }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    // Wait for layout to settle
    const ctx = gsap.context(() => {
      // How far to scroll horizontally = total track width minus viewport width
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return -(trackWidth - viewportWidth + 96) // 96px padding
      }

      // Pin the section, then move the track left as user scrolls
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: getScrollAmount() * self.progress })
        },
      })

      // Animate title in when section reaches top
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7,
            scrollTrigger: { trigger: container, start: 'top 80%', once: true },
          }
        )
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="overflow-hidden bg-black py-20">
      {/* Section header */}
      <div ref={titleRef} className="max-w-[1400px] mx-auto px-12 mb-12 opacity-0">
        {eyebrow && (
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-3">{eyebrow}</p>
        )}
        {title && (
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {title}
          </h2>
        )}
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex gap-4 px-12 will-change-transform">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="group flex-shrink-0 w-72 md:w-80 bg-surface border border-[rgba(0,212,255,0.08)] hover:border-[rgba(0,212,255,0.4)] transition-all duration-300 p-8 flex flex-col"
          >
            {/* Top accent line — fills on hover */}
            <div className="h-px bg-dim group-hover:bg-cyan transition-colors duration-300 mb-6" />

            {item.icon && (
              <div className="text-3xl mb-4 text-cyan">{item.icon}</div>
            )}

            <h3 className="font-display font-bold text-white text-xl mb-3 group-hover:text-cyan transition-colors leading-tight">
              {item.label}
            </h3>

            {item.description && (
              <p className="text-muted text-sm leading-relaxed flex-1 mb-6">
                {item.description}
              </p>
            )}

            <span className="font-mono text-xs text-dim group-hover:text-cyan transition-colors">
              Learn More →
            </span>
          </Link>
        ))}

        {/* Final CTA card */}
        <div className="flex-shrink-0 w-64 border border-dashed border-[rgba(0,212,255,0.15)] flex items-center justify-center p-8 ml-4">
          <Link
            to={items[0]?.path?.split('/').slice(0, 2).join('/') || '/products'}
            className="font-mono text-xs text-cyan tracking-widest uppercase hover:text-white transition-colors text-center"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="max-w-[1400px] mx-auto px-12 mt-8 flex items-center gap-2">
        <div className="w-8 h-px bg-dim" />
        <span className="font-mono text-[10px] text-dim tracking-widest uppercase">Scroll to explore</span>
      </div>
    </section>
  )
}
