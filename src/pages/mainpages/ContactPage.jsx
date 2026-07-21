{/*ContactPage.jsx*/ }

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SITE } from '../../data/siteData'
import { Breadcrumb, SectionHeader } from '../../components/ui'
import { useApi } from '../../hooks'
import { submitContactEnquiry } from '../../lib/api/contacts'
import { logBusinessEvent } from '../../lib/api/analytics'
import { trackEvent } from '../../lib/googleAnalytics'
import Seo from '../../components/seo/Seo'

const initialForm = {
  name: '',
  email: '',
  phone_number: '',
  company: '',
  subject: '',
  message: '',
}

export default function ContactPage() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const { loading, error, run: submit } = useApi(submitContactEnquiry)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submit(form)
      setSubmitted(true)
      logBusinessEvent('contact_submitted')
      trackEvent('generate_lead', { form_name: 'contact' })
      setForm(initialForm)
    } catch {
      // error state is already surfaced via the `error` value from useApi
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(
        [
          '.contact-breadcrumb',
          '.contact-tag',
          '.contact-title',
          '.contact-text',
          '.contact-info',
          '.enquiry-card',
          '.response-tag',
          '.enquiry-title',
          '.enquiry-text',
          '.enquiry-btn',
        ],
        {
          opacity: 0,
          y: 30,
        }
      )

      gsap.set(bgRef.current, {
        scale: 1.1,
      })

      const tl = gsap.timeline()

      tl.to(bgRef.current, {
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })

        .to(
          '.contact-breadcrumb',
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          '-=1'
        )

        .to(
          '.contact-tag',
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          '-=0.15'
        )

        .to(
          '.contact-title',
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
          },
          '-=0.15'
        )

        .to(
          '.enquiry-card',
          {
            opacity: 1,
            y: 30,
            duration: 0,
          }
        )

        .to(
          '.enquiry-card',
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
          }
        )

        .to(
          '.response-tag',
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
          },
          '-=0.25'
        )

        .to(
          '.enquiry-title',
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          '-=0.1'
        )

        .to(
          '.enquiry-text',
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          '-=0.1'
        )

        .fromTo(
          '.enquiry-btn',
          {
            opacity: 0,
            scale: 0.9,
            y: 15,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: 'back.out(1.7)',
          },
          '-=0.1'
        )

        .to(
          '.contact-text',
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
          '-=0.15'
        )

        .to(
          '.contact-info',
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
          },
          '-=0.05'
        )

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Seo
        description="Contact Vayuron Advanced Systems for product enquiries, partnerships, and defence briefings."
        path="/contact"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <main>

        <section
          ref={heroRef}
          className="relative min-h-[100vh] flex items-center overflow-hidden border-b border-[rgba(0,212,255,0.1)]"
        >

          {/* Animated Background */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/Green.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Cyan Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-20 sm:py-24 md:py-28">

            <div className="contact-breadcrumb mb-6">
              <Breadcrumb crumbs={[{ label: 'Contact' }]} />
            </div>

            <p className="contact-tag font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-4">
              Contact
            </p>

            <div className="contact-title">
              <SectionHeader
                title="Get in Touch"
                className="mb-6"
              />
            </div>

            <p className="contact-text max-w-xl text-[var(--muted)] text-base md:text-lg leading-relaxed mb-8 md:mb-14">
              Speak with our engineering and commercial team about your
              operational requirements.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

              {/* Direct Contact */}
              <div className="contact-info">

                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-5">
                  Direct Contact
                </p>

                <div className="space-y-3 mb-10">

                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="flex items-center gap-3 text-white/100 hover:text-cyan transition-colors font-mono text-base"
                  >
                    <span>📞</span>
                    {SITE.phone}
                  </a>

                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-white/100 hover:text-cyan transition-colors font-mono text-base"
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
                    47, Balaji Nagar, Ayodhya Bypass,
                    <br />
                    Bhopal, Madhya Pradesh 462023,
                    <br />
                    India
                  </a>

                </div>

              </div>

              {/* Enquiry Card */}
              <div className="enquiry-card border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-6 md:p-8 rounded-sm w-full">
                <p className="response-tag font-mono text-xs tracking-widest uppercase text-cyan mb-3">
                  Response Time
                </p>

                <h2 className="enquiry-title font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  Send an Enquiry
                </h2>

                <p className="enquiry-text text-[var(--muted)] leading-relaxed mb-6 text-sm">                  Complete our secure enquiry form and our engineering team
                  will respond within two business days.
                </p>

                {submitted ? (
                  <div className="enquiry-btn border border-cyan/30 bg-cyan/5 px-5 py-4 text-sm text-white/90 leading-relaxed">
                    Thank you — your enquiry has been received. Our team will
                    respond within two business days.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="enquiry-btn space-y-3">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full name *"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email address *"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="tel"
                        name="phone_number"
                        placeholder="Phone"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                      />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                    />
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Your message *"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
                    />

                    {error && (
                      <p className="text-xs text-red-400 leading-relaxed">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending…' : 'Send Enquiry →'}
                    </button>
                  </form>
                )}

              </div>

            </div>

          </div>

        </section>

      </main>

    </>
  )
}