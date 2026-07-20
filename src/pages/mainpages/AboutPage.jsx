import { Helmet } from 'react-helmet-async'
import { PageBanner, SectionHeader, StatCard, CTAButton, CardGrid } from '../../components/ui'
import StackSection from '../../components/sections/StackSection'

// ─── Mission Areas ────────────────────────────────────────────────────────
const missionAreas = [
  'Intelligence, Surveillance & Reconnaissance',
  'Tactical UAV Systems',
  'FPV Mission Systems',
  'Loitering Munition Technologies',
  'Counter-Drone Solutions',
  'AI-Enabled Mission Systems',
  'Autonomous Navigation Systems',
  'Secure Communication Technologies',
  'Industrial UAV Platforms',
]

// ─── Business Verticals ───────────────────────────────────────────────────
const businessVerticals = [
  {
    title: 'VAYURON DEFENCE SYSTEMS',
    tagline: 'Development of mission-ready technologies for modern battlefield and security environments.',
    capabilities: [
      'Tactical UAV Systems',
      'FPV Strike Platforms',
      'ISR Platforms',
      'Loitering Munition Systems',
      'Counter-UAS Technologies',
      'Mission Software',
    ],
  },
  {
    title: 'VAYURON AUTONOMOUS SYSTEMS',
    tagline: 'Focused on intelligent autonomous technologies and AI-enabled operational systems.',
    capabilities: [
      'Autonomous Navigation',
      'AI-Based Mission Assistance',
      'Computer Vision',
      'Human-Machine Teaming',
      'Swarm Systems',
      'Edge Computing',
    ],
  },
  {
    title: 'VAYURON INDUSTRIAL SOLUTIONS',
    tagline: 'Advanced aerial intelligence solutions for critical infrastructure and industrial operations.',
    capabilities: [
      'Inspection Systems',
      'Asset Intelligence',
      'Survey & Mapping',
      'Digital Twin Creation',
      'Smart Infrastructure Monitoring',
    ],
  },
  {
    title: 'VAYURON AEROSPACE TECHNOLOGIES',
    tagline: 'Research, development, manufacturing, and integration of advanced aerial systems.',
    capabilities: [
      'Airframe Engineering',
      'Composite Structures',
      'Payload Integration',
      'Embedded Electronics',
      'Flight Testing',
    ],
  },
]

// ─── Services Portfolio ───────────────────────────────────────────────────
const services = [
  {
    title: 'Survey & Mapping',
    items: ['Topographic Survey', 'Corridor Mapping', 'Volume Analysis', 'GIS Data Creation'],
  },
  {
    title: 'Inspection Services',
    items: ['Transmission Line Inspection', 'Solar Plant Inspection', 'Wind Turbine Inspection', 'Industrial Asset Inspection'],
  },
  {
    title: 'Asset Intelligence',
    items: ['Digital Twin Creation', 'Asset Inventory Mapping', 'AI-Assisted Defect Detection', 'Predictive Maintenance Support'],
  },
  {
    title: 'Training & Consultancy',
    items: ['UAV Pilot Training', 'UAV Engineering Training', 'Technical Consultancy', 'Custom Program Development'],
  },
]

// ─── Engineering Capabilities ─────────────────────────────────────────────
const engineeringCapabilities = [
  {
    title: 'Mechanical Engineering',
    items: ['Airframe Design', 'Structural Analysis', 'Composite Engineering', 'CAD & Simulation', 'Payload Integration'],
  },
  {
    title: 'Electronics Engineering',
    items: ['Embedded Systems', 'Power Systems', 'Communication Systems', 'Flight Controllers', 'Sensor Integration'],
  },
  {
    title: 'Software Engineering',
    items: ['Mission Software', 'Computer Vision', 'AI Algorithms', 'Ground Control Systems', 'Data Analytics'],
  },
  {
    title: 'Systems Engineering',
    items: ['End-to-End Integration', 'Reliability Engineering', 'Design Verification', 'Validation Testing', 'Operational Deployment'],
  },
]

// ─── Why Vayuron ─────────────────────────────────────────────────────────
const differentiators = [
  {
    title: 'Indigenous Engineering',
    description: 'Solutions designed and developed with a focus on local operational requirements and self-reliance.',
  },
  {
    title: 'Mission-Oriented Development',
    description: 'Every product is engineered around real operational challenges rather than technology demonstrations.',
  },
  {
    title: 'Deep Technology Focus',
    description: 'Strong emphasis on autonomy, AI, ISR, communication systems, and advanced UAV technologies.',
  },
  {
    title: 'Rapid Innovation Cycle',
    description: 'Design, prototype, test, validate, and deploy under a single integrated engineering ecosystem.',
  },
  {
    title: 'Multi-Domain Expertise',
    description: 'Capabilities spanning defence, industrial, utility, infrastructure, and government sectors.',
  },
  {
    title: 'Operational Experience',
    description: 'Built upon years of field deployments, engineering development, inspection projects, and mission-critical operations.',
  },
]

// ─── R&D Focus Areas ─────────────────────────────────────────────────────
const rdFocusAreas = [
  'Autonomous UAV Systems',
  'Tactical ISR Platforms',
  'FPV Systems',
  'Loitering Munition Technologies',
  'Counter-UAS Technologies',
  'Fiber Guided UAV Systems',
  'Human Machine Teaming',
  'Computer Vision Systems',
  'AI-Based Target Recognition',
  'Swarm Technologies',
  'Edge Computing',
  'Mission Intelligence Systems',
]

// ─── Infrastructure / Facilities ─────────────────────────────────────────
const facilities = [
  'Engineering Design Center',
  'Product Development Laboratory',
  'UAV Assembly Facility',
  'Electronics Integration Lab',
  'Rapid Prototyping Facility',
  'Ground Testing Equipment',
  'Payload Integration Station',
  'Flight Test Equipment',
  'Mission Simulation Systems',
  'Training Infrastructure',
  'Field Deployment Equipment',
  'Maintenance & Service Support Systems',
]

// ─── Shared card class helpers ────────────────────────────────────────────
const domainCard = "group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 overflow-hidden"

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="VAYURON Advanced Systems Pvt. Ltd. is an advanced autonomous systems company focused on the development, integration, and deployment of mission-critical technologies for defence, industrial, infrastructure, utility, and government sectors."
        />
      </Helmet>

      <main>

        {/* ═══ S1 — HERO  (index 0) ══════════════════════════════════════ */}
        <StackSection index={0}>
          <PageBanner
            eyebrow="About Vayuron"
            title="Engineering Intelligent Systems for Mission-Critical Operations"
            subtitle="Vayuron Advanced Systems Pvt. Ltd. is an advanced autonomous systems company focused on the development, integration, and deployment of mission-critical technologies for defence, industrial, infrastructure, utility, and government sectors."
            crumbs={[{ label: 'About' }]}
            backgroundImage="/FixedWingDRone.png"
            backgroundVideoMp4="/Drone1.mp4"
          />
        </StackSection>

        {/* ═══ S2 — MISSION FIRST SOLUTIONS  (index 1) ══════════════════ */}
        <StackSection index={1}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/about2.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24">
              <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">Mission First Solutions</p>
              <h2 className="font-display text-4xl font-bold text-white mb-10 leading-tight">
                At VAYURON Advanced Systems, we believe technology must ultimately serve a mission larger than itself.
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  { title: 'Mission-Driven Technology', description: 'Focuses on intelligent autonomous systems that save lives and protect critical assets.' },
                  { title: 'Modern Solutions', description: 'Develops fast, adaptive, and reliable systems for battlefields, borders, and industrial networks.' },
                  { title: 'Indigenous Deep-Tech', description: 'Specialised in localized technology for defence, homeland security, and public sectors.' },
                  { title: 'Industrial Impact', description: 'Provides aerial systems that reduce maintenance costs and deliver actionable intelligence.' },
                  { title: 'Core Commitment', description: 'Dedicates efforts to building impactful technologies, strengthening capabilities, and protecting lives.' },
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                    <p className="text-white text-lg leading-relaxed">
                      <span className="font-bold text-cyan">{point.title}: </span>
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══ S3 — OUR MISSION AREAS  (index 2) ════════════════════════ */}
        <StackSection index={2}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/About4.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="What We Focus On" title="Our Mission Areas" subtitle="Ten technology domains where VAYURON builds indigenous, mission-critical capability." />
              <CardGrid gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {missionAreas.map((area, i) => (
                  <div key={i} className="group relative flex items-start rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-5 py-4 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <span className="text-white text-sm leading-relaxed group-hover:text-cyan transition-colors">{area}</span>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S4 — COMPANY PROFILE / VISION + MISSION  (index 3) ═══════ */}
        <StackSection index={3}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/about3.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="Company Profile" title="About VAYURON" centered />
              <p className="text-white text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12">
                The company specializes in UAV platforms, FPV systems, ISR technologies, AI-enabled mission systems, aerial intelligence platforms, robotics, and autonomous technologies. By combining engineering expertise, operational experience, indigenous innovation, and field deployment knowledge, VAYURON develops practical solutions designed for real-world operational environments.
              </p>
              <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'Vision', text: 'To become a globally respected advanced autonomous systems company developing indigenous technologies that redefine intelligence, mobility, surveillance, and operational effectiveness across defence, industrial, and public sector domains.' },
                  { label: 'Mission', text: 'To engineer reliable, intelligent, and scalable autonomous systems that solve critical challenges through innovation, precision engineering, and operational excellence while strengthening technological self-reliance through indigenous development.' },
                ].map((card, i) => (
                  <div key={i} className="group relative rounded-xl border border-[rgba(0,212,255,0.12)] backdrop-blur-lg bg-black/20 hover:bg-black/30 hover:border-cyan/50 hover:-translate-y-1 transition-all duration-300 p-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
                    <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-5">{card.label}</p>
                    <p className="text-white text-xl leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S6 — BUSINESS VERTICALS  (index 5) ═══════════════════════ */}
        <StackSection index={5}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/About4.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="Business Verticals" title="Four Divisions. One Mission." subtitle="VAYURON operates through four specialised divisions covering defence, autonomy, industrial, and aerospace domains." />
              <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {businessVerticals.map((bv, i) => (
                  <div key={i} className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-7 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-sm font-bold text-cyan mb-1 tracking-wide">{bv.title}</h3>
                    <p className="text-white text-xs leading-normal mb-5">{bv.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      {bv.capabilities.map((cap, j) => (
                        <span key={j} className="text-[10px] font-mono tracking-widest uppercase text-white border border-white/10 rounded px-2 py-1 group-hover:border-cyan/20 transition-colors">{cap}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S9 — SERVICES PORTFOLIO  (index 8) — NEW ══════════════════ */}
        <StackSection index={8}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/about3.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="Services" title="Services Portfolio" subtitle="End-to-end aerial intelligence and UAV services delivered across defence, industrial, and government sectors." />
              <CardGrid gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {services.map((svc, i) => (
                  <div key={i} className={domainCard}>
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-base font-bold text-cyan mb-4">{svc.title}</h3>
                    <ul className="space-y-2">
                      {svc.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                          <span className="text-white text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S10 — ENGINEERING CAPABILITIES  (index 9) — NEW ═══════════ */}
        <StackSection index={9}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/Operational.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="Engineering" title="Engineering Capabilities" subtitle="VAYURON maintains multidisciplinary engineering capabilities covering the complete product lifecycle from concept to deployment." />
              <CardGrid gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {engineeringCapabilities.map((eng, i) => (
                  <div key={i} className={domainCard}>
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-base font-bold text-cyan mb-4">{eng.title}</h3>
                    <ul className="space-y-2">
                      {eng.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                          <span className="text-white text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S11 — WHY VAYURON  (index 10) ════════════════════════════ */}
        <StackSection index={10}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/about2.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="Why Vayuron" title="Built for Operational Reality" subtitle="Six pillars that define how we engineer, deploy, and support every platform." />
              <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {differentiators.map((d, i) => (
                  <div key={i} className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg p-6 transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">{d.title}</h3>
                    <p className="text-white text-sm leading-relaxed">{d.description}</p>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S12 — R&D FOCUS AREAS  (index 11) ════════════════════════ */}
        <StackSection index={11}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/about3.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="Research & Development" title="Current R&D Focus Areas" subtitle="Research and development form the foundation of VAYURON's long-term growth strategy." />
              <CardGrid gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-10">
                {rdFocusAreas.map((area, i) => (
                  <div key={i} className="group relative flex items-start rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-5 py-4 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <span className="text-white text-sm leading-relaxed group-hover:text-cyan transition-colors">{area}</span>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S13 — INFRASTRUCTURE / FACILITIES  (index 12) ════════════ */}
        <StackSection index={12}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/Operational.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="Infrastructure" title="Facilities & Capabilities" subtitle="VAYURON maintains infrastructure supporting engineering, manufacturing, testing, and deployment activities." />
              <CardGrid gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {facilities.map((facility, i) => (
                  <div key={i} className="group relative flex items-center rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-5 py-4 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                    <span className="text-white text-sm group-hover:text-cyan transition-colors">{facility}</span>
                  </div>
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        {/* ═══ S14 — COMPANY STATS  (index 13) ══════════════════════════ */}
        <StackSection index={13}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/TechIndigenous.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
              <SectionHeader eyebrow="By the Numbers" title="Company Stats" centered />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                <StatCard value={8} suffix="" label="Years Operating" />
                <StatCard value={50} suffix="+" label="Deployments" />
                <StatCard value={12} suffix="" label="Sectors Served" />
                <StatCard value={100} suffix="+" label="Team Members" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="text-center rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-6 py-5">
                  <div className="font-mono text-xs tracking-widest uppercase text-cyan">Mission-Critical Solutions</div>
                </div>
                <div className="text-center rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg px-6 py-5">
                  <div className="font-mono text-xs tracking-widest uppercase text-cyan">Indigenous Technology Focus</div>
                </div>
              </div>
            </div>
          </section>
        </StackSection>

        {/* ═══ S15 — CTA  (index 14) ═════════════════════════════════════ */}
        <StackSection index={14} dim={false}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/About4.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-24 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Join Our Mission</h2>
              <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                We are always looking for engineers, researchers, and operators who want to build meaningful technology for national security.
              </p>
              <div className="flex justify-center gap-5 flex-wrap mt-10">
                <CTAButton to="/careers" variant="primary">View Open Roles</CTAButton>
                <CTAButton to="/contact" variant="secondary">Partner With Us</CTAButton>
              </div>
            </div>
          </section>
        </StackSection>

      </main>
    </>
  )
}
