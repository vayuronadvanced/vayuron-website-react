import { Helmet } from 'react-helmet-async'
import ParallaxBanner from '../components/sections/ParallaxBanner'
import Accordion from '../components/ui/display/Accordion'
import MagneticButton from '../components/ui/display/MagneticButton'
import { HUDFrame } from '../components/ui/display/HUDOverlay'
import { FeatureCardEnhanced } from '../components/ui/cards'
import { useGSAPReveal } from '../hooks/useAnimation'

const perks = [
  { icon: '🏗', title: 'Build Real Systems',  description: 'Work on platforms that fly and are deployed in live operational environments — not prototypes sitting in a lab.' },
  { icon: '🇮🇳', title: 'National Impact',   description: 'Your work directly supports India\'s defence, security, and critical infrastructure capability.' },
  { icon: '📚', title: 'Learning Budget',     description: 'Annual conference, course, and certification budget for every team member across all departments.' },
  { icon: '💼', title: 'ESOP Available',      description: 'Equity participation available for senior hires and long-term team members building the company.' },
]

const openRoles = [
  {
    title: 'Senior Embedded Systems Engineer',
    content: (
      <div className="space-y-4">
        <p className="text-muted text-sm leading-relaxed">Design and develop avionics firmware, sensor interfaces, and real-time control systems for our UAV platforms.</p>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Requirements</p>
          <ul className="space-y-1">
            {['5+ years embedded C/C++', 'RTOS experience (FreeRTOS/Zephyr)', 'PCB design familiarity', 'DGCA knowledge a plus'].map((r,i) => (
              <li key={i} className="flex items-center gap-2 text-muted text-sm"><span className="w-1 h-1 rounded-full bg-dim flex-shrink-0"/>{r}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <span className="font-mono text-[10px] text-muted">📍 Bhopal, MP</span>
          <span className="font-mono text-[10px] text-muted">⏱ Full-Time</span>
          <a href="mailto:careers@vayuronadvancedsystems.com?subject=Application: Senior Embedded Systems Engineer"
             className="font-mono text-xs text-cyan hover:text-white transition-colors">Apply →</a>
        </div>
      </div>
    ),
  },
  {
    title: 'AI/ML Engineer — Computer Vision',
    content: (
      <div className="space-y-4">
        <p className="text-muted text-sm leading-relaxed">Develop and optimise deep learning models for object detection, tracking, and classification on edge hardware.</p>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Requirements</p>
          <ul className="space-y-1">
            {['Python, PyTorch/TensorFlow', 'Edge inference optimisation (ONNX/TFLite)', 'Defence dataset experience', 'Published research welcome'].map((r,i) => (
              <li key={i} className="flex items-center gap-2 text-muted text-sm"><span className="w-1 h-1 rounded-full bg-dim flex-shrink-0"/>{r}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <span className="font-mono text-[10px] text-muted">📍 Bhopal, MP</span>
          <span className="font-mono text-[10px] text-muted">⏱ Full-Time</span>
          <a href="mailto:careers@vayuronadvancedsystems.com?subject=Application: AI/ML Engineer"
             className="font-mono text-xs text-cyan hover:text-white transition-colors">Apply →</a>
        </div>
      </div>
    ),
  },
  {
    title: 'UAV Test Pilot',
    content: (
      <div className="space-y-4">
        <p className="text-muted text-sm leading-relaxed">Lead flight test campaigns, develop test procedures, and validate platform performance across operational scenarios.</p>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Requirements</p>
          <ul className="space-y-1">
            {['DGCA RPAS certification', '200+ flight hours', 'Test documentation experience', 'Military background preferred'].map((r,i) => (
              <li key={i} className="flex items-center gap-2 text-muted text-sm"><span className="w-1 h-1 rounded-full bg-dim flex-shrink-0"/>{r}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <span className="font-mono text-[10px] text-muted">📍 Bhopal, MP</span>
          <span className="font-mono text-[10px] text-muted">⏱ Full-Time</span>
          <a href="mailto:careers@vayuronadvancedsystems.com?subject=Application: UAV Test Pilot"
             className="font-mono text-xs text-cyan hover:text-white transition-colors">Apply →</a>
        </div>
      </div>
    ),
  },
  {
    title: 'Full-Stack Software Engineer',
    content: (
      <div className="space-y-4">
        <p className="text-muted text-sm leading-relaxed">Build mission-critical ground control, data management, and operational dashboard software for defence clients.</p>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Requirements</p>
          <ul className="space-y-1">
            {['React / Node.js / Python', 'Real-time systems experience', 'Security-conscious development', 'REST/gRPC API design'].map((r,i) => (
              <li key={i} className="flex items-center gap-2 text-muted text-sm"><span className="w-1 h-1 rounded-full bg-dim flex-shrink-0"/>{r}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <span className="font-mono text-[10px] text-muted">📍 Bhopal / Remote</span>
          <span className="font-mono text-[10px] text-muted">⏱ Full-Time</span>
          <a href="mailto:careers@vayuronadvancedsystems.com?subject=Application: Full-Stack Engineer"
             className="font-mono text-xs text-cyan hover:text-white transition-colors">Apply →</a>
        </div>
      </div>
    ),
  },
  {
    title: 'Mechanical Design Engineer',
    content: (
      <div className="space-y-4">
        <p className="text-muted text-sm leading-relaxed">Design airframes, payload integration mounts, and mechanical systems for UAV platforms and ground equipment.</p>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Requirements</p>
          <ul className="space-y-1">
            {['SolidWorks / CATIA proficiency', 'CFRP/composites experience', 'FEA analysis capability', 'Aerospace tolerancing knowledge'].map((r,i) => (
              <li key={i} className="flex items-center gap-2 text-muted text-sm"><span className="w-1 h-1 rounded-full bg-dim flex-shrink-0"/>{r}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <span className="font-mono text-[10px] text-muted">📍 Bhopal, MP</span>
          <span className="font-mono text-[10px] text-muted">⏱ Full-Time</span>
          <a href="mailto:careers@vayuronadvancedsystems.com?subject=Application: Mechanical Design Engineer"
             className="font-mono text-xs text-cyan hover:text-white transition-colors">Apply →</a>
        </div>
      </div>
    ),
  },
  {
    title: 'Business Development — Defence',
    content: (
      <div className="space-y-4">
        <p className="text-muted text-sm leading-relaxed">Develop relationships with defence clients, identify procurement opportunities, and lead proposal development.</p>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Requirements</p>
          <ul className="space-y-1">
            {['Defence procurement experience', 'DPP/DAP familiarity', 'Technical sales background', 'Existing MoD/state network'].map((r,i) => (
              <li key={i} className="flex items-center gap-2 text-muted text-sm"><span className="w-1 h-1 rounded-full bg-dim flex-shrink-0"/>{r}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <span className="font-mono text-[10px] text-muted">📍 New Delhi / Bhopal</span>
          <span className="font-mono text-[10px] text-muted">⏱ Full-Time</span>
          <a href="mailto:careers@vayuronadvancedsystems.com?subject=Application: Business Development Defence"
             className="font-mono text-xs text-cyan hover:text-white transition-colors">Apply →</a>
        </div>
      </div>
    ),
  },
]

export default function CareersPage() {
  const perksRef = useGSAPReveal({ y: 20, stagger: 0.08 })

  return (
    <>
      <Helmet>
        <title>Careers — Vayuron Advanced Systems</title>
        <meta name="description" content="Join Vayuron Advanced Systems — build autonomous UAV, AI, and defence technology for India's national security." />
      </Helmet>
      <main>
        <ParallaxBanner
          eyebrow="Careers"
          title="Build What Matters"
          subtitle="Join the team engineering India's next generation of autonomous defence and industrial systems."
          crumbs={[{ label: 'Careers' }]}
        />

        {/* Perks */}
        <section className="py-16 bg-surface border-b border-[rgba(0,212,255,0.08)] px-6">
          <div ref={perksRef} className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map((perk, i) => (
              <FeatureCardEnhanced key={i} icon={perk.icon} title={perk.title} description={perk.description} index={i} />
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan mb-3">Open Positions</p>
          <h2 className="font-display font-bold text-white mb-2" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            {openRoles.length} Open Roles
          </h2>
          <p className="text-muted mb-10">Across engineering, AI, operations, and commercial functions.</p>
          <Accordion items={openRoles} allowMultiple={false} />
        </section>

        {/* Speculative */}
        <section className="py-20 bg-surface border-t border-[rgba(0,212,255,0.1)] px-6">
          <div className="max-w-[1400px] mx-auto">
            <HUDFrame label="SPECULATIVE APPLICATIONS">
              <div className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Don't See Your Role?</h3>
                  <p className="text-muted text-sm max-w-xl">We always welcome speculative applications from exceptional engineers. Send us your CV and tell us what you'd build.</p>
                </div>
                <div className="flex-shrink-0">
                  <MagneticButton
                    href="mailto:careers@vayuronadvancedsystems.com?subject=Speculative Application"
                    variant="primary"
                  >
                    Send Speculative Application
                  </MagneticButton>
                </div>
              </div>
            </HUDFrame>
          </div>
        </section>
      </main>
    </>
  )
}
