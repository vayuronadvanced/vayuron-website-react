import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton, CyanDivider } from '../components/ui'
import { useScrollReveal } from '../hooks'

const openRoles = [
  {
    title: 'Senior Embedded Systems Engineer',
    department: 'Engineering',
    location: 'Bhopal, MP',
    type: 'Full-Time',
    description:
      'Design and develop avionics firmware, sensor interfaces, and real-time control systems for our UAV platforms.',
    requirements: ['C/C++', 'RTOS experience', 'PCB design familiarity', 'DGCA knowledge a plus'],
  },
  {
    title: 'AI/ML Engineer — Computer Vision',
    department: 'Artificial Intelligence',
    location: 'Bhopal, MP',
    type: 'Full-Time',
    description:
      'Develop and optimise deep learning models for object detection, tracking, and classification on edge hardware.',
    requirements: [
      'Python, PyTorch/TensorFlow',
      'Edge inference optimisation',
      'Defence datasets experience',
      'Published research welcome',
    ],
  },
  {
    title: 'UAV Test Pilot',
    department: 'Operations',
    location: 'Bhopal, MP',
    type: 'Full-Time',
    description:
      'Lead flight test campaigns, develop test procedures, and validate platform performance across operational scenarios.',
    requirements: ['DGCA RPAS certification', 'Test documentation experience', 'Military background preferred'],
  },
  {
    title: 'Full-Stack Software Engineer',
    department: 'Software Systems',
    location: 'Bhopal, MP / Remote',
    type: 'Full-Time',
    description:
      'Build mission-critical ground control, data management, and operational dashboard software for defence clients.',
    requirements: [
      'React / Node.js / Python',
      'Real-time systems experience',
      'Security-conscious development',
      'REST/gRPC API design',
    ],
  },
  {
    title: 'Mechanical Design Engineer',
    department: 'Advanced Engineering',
    location: 'Bhopal, MP',
    type: 'Full-Time',
    description:
      'Design airframes, payload integration mounts, and mechanical systems for UAV platforms and ground equipment.',
    requirements: [
      'SolidWorks / CATIA proficiency',
      'CFRP/composites experience',
      'FEA analysis',
      'Aerospace tolerancing knowledge',
    ],
  },
  {
    title: 'Business Development — Defence',
    department: 'Commercial',
    location: 'New Delhi / Bhopal',
    type: 'Full-Time',
    description:
      'Develop relationships with defence clients, identify procurement opportunities, and lead proposal development.',
    requirements: [
      'Defence procurement experience',
      'DPP/DAP familiarity',
      'Technical sales background',
      'Existing MoD/state network',
    ],
  },
]

const perks = [
  {
    label: 'Build Real Systems',
    description:
      'Work on platforms that fly, deployed in real operational environments.',
  },
  {
    label: 'National Impact',
    description:
      "Your work directly supports India's defence and critical infrastructure capability.",
  },
  {
    label: 'Learning Budget',
    description:
      'Annual conference, course, and certification budget for every team member.',
  },
  {
    label: 'ESOP Available',
    description:
      'Equity participation for senior hires and long-term team members.',
  },
]

export default function CareersPage() {
  const ref = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Careers — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Join Vayuron Advanced Systems — build autonomous UAV, AI, and defence technology for India's national security. Open roles in engineering, AI, and operations."
        />
      </Helmet>

      <main>
        <PageBanner
          eyebrow="Careers"
          title="Build What Matters"
          subtitle="Join the team engineering India's next generation of autonomous defence and industrial systems."
          crumbs={[{ label: 'Careers' }]}
          backgroundImage="/CareerPageDrone.png"
        />

        {/* Perks */}
        <section className="py-16 bg-surface border-b border-[rgba(0,212,255,0.1)] px-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map((perk, i) => (
              <div key={i} className="text-center p-6 font-sans">
                <h3 className="font-display text-white text-base mb-2 tracking-wide">
                  {perk.label}
                </h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section ref={ref} className="reveal py-24 px-6 max-w-[1400px] mx-auto">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Open Positions
          </h2>

          <p className="text-muted mb-12">
            {openRoles.length} open roles across engineering, AI, operations, and commercial.
          </p>

          <div className="space-y-4">
            {openRoles.map((role, i) => (
              <details
                key={i}
                className="group bg-surface border border-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.3)] transition-colors"
              >
                <summary className="flex items-start justify-between gap-4 p-6 cursor-pointer list-none">
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-white group-hover:text-cyan transition-colors">
                      {role.title}
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="font-mono text-xs text-cyan">
                        {role.department}
                      </span>
                      <span className="font-mono text-xs text-muted">·</span>
                      <span className="font-mono text-xs text-muted">
                        {role.location}
                      </span>
                      <span className="font-mono text-xs text-muted">·</span>
                      <span className="font-mono text-xs text-muted">
                        {role.type}
                      </span>
                    </div>
                  </div>

                  <span className="text-cyan font-mono text-sm flex-shrink-0 mt-1 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>

                <div className="px-6 pb-6 border-t border-[rgba(0,212,255,0.08)] pt-4">
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {role.description}
                  </p>

                  <h4 className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
                    Requirements
                  </h4>

                  <ul className="space-y-1 mb-6">
                    {role.requirements.map((req, j) => (
                      <li key={j} className="flex items-center gap-3 text-muted text-sm">
                        <span className="w-1 h-1 rounded-full bg-dim flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf9WNfK3XwIMXWCLWNKt15HFDkM8xGS6lXWAt78Fn0_Nj1oPA/viewform?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all px-5 py-2.5 font-mono text-xs tracking-widest uppercase"
                  >
                    Apply Now →
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>

        <CyanDivider className="max-w-[1400px] mx-auto px-6" />
      </main>
    </>
  )
}