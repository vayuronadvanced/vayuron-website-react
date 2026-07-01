import { Helmet } from 'react-helmet-async'
import { SITE } from '../data/siteData'
import { Breadcrumb, SectionHeader } from '../components/ui'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Contact Vayuron Advanced Systems for product enquiries, partnerships, and defence briefings."
        />
      </Helmet>

      <main>
        <section
          className="relative min-h-[100vh] flex items-center overflow-hidden border-b border-[rgba(0,212,255,0.1)]"
          style={{
            backgroundImage: "url('/Green.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark overlay so text stays readable over the background photo */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-28">

            <div className="mb-6">
              <Breadcrumb crumbs={[{ label: 'Contact' }]} />
            </div>

            <p className="font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-4">
              Contact
            </p>

            <SectionHeader
              title="Get in Touch"
              className="mb-6"
            />

            <p className="max-w-xl text-[var(--muted)] text-base md:text-lg leading-relaxed mb-14">
              Speak with our engineering and commercial team about your
              operational requirements.
            </p>

            {/* Two-column layout: direct contact info + enquiry card */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

              {/* Direct Contact */}
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-5">
                  Direct Contact
                </p>

                <div className="space-y-3 mb-10">

                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="flex items-center gap-3 text-white hover:text-cyan transition-colors font-mono text-base"
                  >
                    <span>📞</span>
                    {SITE.phone}
                  </a>

                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-white hover:text-cyan transition-colors font-mono text-base"
                  >
                    <span>✉</span>
                    {SITE.email}
                  </a>

                </div>

                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
                    Office Address
                  </p>

                  <p className="text-[var(--muted)] leading-relaxed mb-2">
                    Vayuron Advanced Systems
                  </p>

                  <a
                    href="https://maps.google.com/?q=47+Balaji+Nagar,+Ayodhya+Nagar,+Bhopal,+Madhya+Pradesh+462023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[var(--muted)] hover:text-cyan transition leading-relaxed"
                  >
                    47, Balaji Nagar,Ayodhya Bypass,
                    <br />
                    Bhopal, Madhya Pradesh 462023,
                    <br />
                    India
                  </a>
                </div>
              </div>

              {/* Enquiry Card */}
              <div className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-6 md:p-8 rounded-sm w-full">

                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
                  Response Time
                </p>



                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  Send an Enquiry
                </h2>

                <p className="text-[var(--muted)] leading-relaxed mb-6 text-sm">
                  Complete our secure enquiry form and our engineering team
                  will respond within two business days.
                </p>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSewI60dNbbQqrlHw_Xh8Wa3b_desNWJkJuFoICh01gi6NFRnw/viewform?usp=sharing&ouid=100144093646921205317"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all"
                >
                  Open Secure Form →
                </a>

              </div>

            </div>

          </div>
        </section>
      </main>
    </>
  )
}
