import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { PageBanner, SectionHeader } from '../components/ui'

export default function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers — Vayuron Advanced Systems</title>
      </Helmet>

      <main>
        <PageBanner
          eyebrow="Careers"
          title="Join Our Team"
          crumbs={[{ label: 'Careers' }]}
          backgroundImage="/career1.png"
        />

        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('/career2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark Overlay : <div className="absolute inset-0 bg-black/70"></div> */}
          

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-20 text-center">
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
              className="mt-8 inline-block px-8 py-3 border border-[var(--cyan)] text-[var(--cyan)] text-sm tracking-widest uppercase hover:bg-[var(--cyan)] hover:text-[var(--black)] transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}