import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// ─── Infinite Marquee Ticker ───────────────────────────────────────────────
// A horizontal ticker of text/tags that scrolls infinitely
// Used between page sections as a visual divider
export default function MarqueeTicker({ items = [], speed = 40, reverse = false }) {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Clone the inner content to create seamless loop
    const clone = track.firstElementChild?.cloneNode(true)
    if (clone) track.appendChild(clone)

    const totalWidth = track.firstElementChild?.scrollWidth || 0

    tweenRef.current = gsap.to(track, {
      x: reverse ? totalWidth : -totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,             // Infinite repeat
      modifiers: {
        // Keep position within the single-loop range for smooth reset
        x: (x) => {
          const val = parseFloat(x)
          const mod = reverse
            ? ((val % totalWidth) + totalWidth) % totalWidth - totalWidth
            : ((val % -totalWidth) - totalWidth) % -totalWidth
          return mod + 'px'
        },
      },
    })

    // Pause on hover — feels premium
    track.addEventListener('mouseenter', () => tweenRef.current?.pause())
    track.addEventListener('mouseleave', () => tweenRef.current?.play())

    return () => {
      tweenRef.current?.kill()
      if (clone && track.contains(clone)) track.removeChild(clone)
    }
  }, [speed, reverse])

  const defaultItems = items.length > 0 ? items : [
    'UAV Systems', '·', 'Artificial Intelligence', '·',
    'Software Systems', '·', 'Advanced Engineering', '·',
    'Defence & Security', '·', 'Smart Cities', '·',
    'Infrastructure Monitoring', '·', 'Disaster Management', '·',
  ]

  return (
    <div className="overflow-hidden border-y border-[rgba(0,212,255,0.06)] bg-surface/50 py-4">
      <div ref={trackRef} className="flex items-center gap-0 whitespace-nowrap will-change-transform">
        <div className="flex items-center gap-8 pr-8">
          {defaultItems.map((item, i) => (
            <span
              key={i}
              className={
                item === '·'
                  ? 'text-cyan text-lg'
                  : 'font-mono text-xs tracking-[0.2em] uppercase text-dim hover:text-muted transition-colors cursor-default'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
