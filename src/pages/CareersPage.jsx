import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Breadcrumb, SectionHeader } from '../components/ui'

export default function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers — Vayuron Advanced Systems</title>
      </Helmet>

      <main>
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-[rgba(0,212,255,0.1)]"
          style={{
            backgroundImage: "url('/career2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Cyan glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 pt-32 pb-24 text-center">

            <div className="mb-6 flex justify-center">
              <Breadcrumb crumbs={[{ label: 'Careers' }]} />
            </div>

            <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
              Careers
            </p>

            <SectionHeader
              title="We're Hiring"
              centered
              className="mb-6"
            />

            <p className="mt-1 max-w-2xl mx-auto text-[var(--muted)] text-base md:text-lg leading-relaxed">
              Join Vayuron Advanced Systems and help shape the next generation of autonomous technologies. Check our latest job openings on LinkedIn, or contact us directly to learn more about opportunities to work with us.
            </p>

            <Link
              to="/contact"
              className="mt-10 inline-block px-8 py-3 border border-[var(--cyan)] text-[var(--cyan)] text-sm tracking-widest uppercase hover:bg-[var(--cyan)] hover:text-[var(--black)] transition-colors duration-200"
            >
              Contact Us
            </Link>

          </div>
        </section>
      </main>
    </>
  )
}