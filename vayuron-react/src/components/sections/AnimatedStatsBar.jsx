import { useRef } from 'react'
import { useGSAPCounter } from '../../hooks/useAnimation'
import { useGSAPReveal } from '../../hooks/useAnimation'

// ─── Single Animated Stat ──────────────────────────────────────────────────
function AnimatedStat({ value, suffix = '', label, duration = 2 }) {
  const { ref, display } = useGSAPCounter(value, suffix, duration)

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display font-bold text-cyan mb-2 leading-none"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        {display}{suffix}
      </div>
      <div className="font-mono text-xs text-muted tracking-[0.2em] uppercase">{label}</div>
    </div>
  )
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────
export default function AnimatedStatsBar({ stats = [], dark = false }) {
  const ref = useGSAPReveal({ y: 20, stagger: 0.1 })

  return (
    <section className={`${dark ? 'bg-black' : 'bg-surface'} border-y border-[rgba(0,212,255,0.08)] py-16`}>
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10"
      >
        {stats.map((stat, i) => (
          <AnimatedStat
            key={i}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            duration={2 + i * 0.2}
          />
        ))}
      </div>
    </section>
  )
}
