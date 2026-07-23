{/*ContactPage.jsx*/ }

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SITE, gmailComposeUrl } from '../../data/siteData'
import { Breadcrumb, SectionHeader, videoMimeType } from '../../components/ui'
import { useApi } from '../../hooks'
import { submitContactEnquiry, submitQuestion, getPublishedQuestions } from '../../lib/api/contacts'
import { logBusinessEvent } from '../../lib/api/analytics'
import { trackEvent } from '../../lib/googleAnalytics'
import Seo from '../../components/seo/Seo'
import StackSection from '../../components/sections/StackSection'

const initialForm = {
  name: '',
  email: '',
  phone_number: '',
  company: '',
  subject: '',
  message: '',
}

const initialQuestionForm = {
  name: '',
  email: '',
  question_text: '',
}

// ─── Ask a Question (below the Contact Hero) ───────────────────────────────
// Reuses the same card/input/button styling as the "Send an Enquiry" form
// above. Submissions go to the same review workflow as the blog CMS
// (pending → staff answers & publishes in Django Admin → appears here).
//
// Sized to fill one screen (min-h-screen, flex-centered) to match the
// other StackSection panels — its own <StackSection> wrapper clips
// anything beyond h-screen, so content stays vertically centered and
// compact rather than top-anchored with dead space below.
function AskQuestionFormSection() {
  const [form, setForm] = useState(initialQuestionForm)
  const { loading, error, run: submit } = useApi(submitQuestion)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submit(form)
      setSubmitted(true)
      logBusinessEvent('question_submitted')
      trackEvent('generate_lead', { form_name: 'ask_a_question' })
      setForm(initialQuestionForm)
    } catch {
      // error state is already surfaced via the `error` value from useApi
    }
  }

  return (
    <section className="relative w-full h-full flex items-center bg-black border-t border-cyan/10 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/VayuronImage.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
          Community Q&amp;A
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          Ask a Question
        </h2>
        <p className="text-[var(--muted)] leading-relaxed mb-6 text-sm">
          Have a question about our products, sectors, or capabilities? Ask
          below — our team reviews and answers submissions, and published
          answers appear on the next section for everyone.
        </p>

        {/* Same card treatment as the enquiry-card above */}
        <div className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-6 md:p-8 rounded-sm w-full">
          {submitted ? (
            <div className="border border-cyan/30 bg-cyan/5 px-5 py-4 text-sm text-white/90 leading-relaxed">
              Thank you — your question has been received. Once our team
              answers it, it will appear in the next section.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                />
              </div>
              <textarea
                name="question_text"
                required
                rows={4}
                placeholder="Your question *"
                value={form.question_text}
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
                {loading ? 'Sending…' : 'Submit Question →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Recently Answered Questions ───────────────────────────────────────────
// Published answers only — pending/unanswered questions never render here
// (enforced server-side by the Question API). This list can grow without
// bound as more questions get answered, which is incompatible with a
// fixed-height, overflow-hidden StackSection panel — so the list itself
// scrolls internally (max-h + overflow-y-auto) instead of the section
// growing past one screen.
function AnsweredQuestionsSection() {
  const {
    data: questionsData,
    loading: faqLoading,
    error: faqError,
    run: fetchQuestions,
  } = useApi(getPublishedQuestions)

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const publishedQuestions = questionsData?.results || questionsData || []

  return (
    <section className="relative w-full h-full flex items-center bg-black border-t border-cyan/10 px-6 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
          Community Q&amp;A
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
          Recently Answered Questions
        </h2>

        {faqLoading && (
          <p className="text-sm text-[var(--muted)]">Loading answered questions…</p>
        )}

        {faqError && (
          <p className="text-sm text-red-400 leading-relaxed">{faqError}</p>
        )}

        {!faqLoading && !faqError && publishedQuestions.length === 0 && (
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            No published questions yet — be the first to ask on the previous
            section.
          </p>
        )}

        {!faqLoading && !faqError && publishedQuestions.length > 0 && (
          <div className="space-y-6 max-h-[52vh] overflow-y-auto pr-2">
            {publishedQuestions.map((q) => (
              <div key={q.id} className="border-b border-white/10 pb-6">
                <h3 className="font-display text-base font-semibold text-white mb-2">
                  {q.question_text}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{q.answer_text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function ContactPage() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const { loading, error, run: submit } = useApi(submitContactEnquiry)
  const [submitted, setSubmitted] = useState(false)

  // Same convention as PageBanner: fall back to a plain poster image when
  // the visitor prefers reduced motion, instead of autoplaying video.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
        title="Contact Our Engineering Team"
        description="Contact Vayuron Advanced Systems for product enquiries, partnership discussions, and defence briefings. Our team responds to every enquiry directly."
        path="/contact"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <main>

        <StackSection index={0}>
          <section
            ref={heroRef}
            className="relative w-full h-full flex items-center overflow-hidden"
          >

            {/* Animated Background — same video convention as PageBanner:
                autoplaying webm with the original image kept as poster and
                as the reduced-motion fallback. */}
            <div ref={bgRef} className="absolute inset-0 overflow-hidden">
              {prefersReducedMotion ? (
                <img
                  src="/images/Green.webp"
                  alt=""
                  aria-hidden="true"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/images/Green.webp"
                  aria-hidden="true"
                >
                  <source src="/videos/Green.webm" type={videoMimeType('/videos/Green.webm')} />
                </video>
              )}
            </div>

            {/* Cyan Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-32 sm:pt-36 md:pt-40 pb-10">
              <div className="mt-6 md:mt-8">
                <div className="contact-breadcrumb mb-4">
                  <Breadcrumb crumbs={[{ label: 'Contact' }]} />
                </div>

                <p className="contact-tag font-mono text-xs tracking-[0.25em] uppercase text-cyan mb-3">
                  Contact
                </p>
              </div>

              <div className="contact-title">
                <SectionHeader
                  as="h1"
                  title="Get in Touch"
                  className="mb-4"
                />
              </div>

              <p className="contact-text max-w-xl text-[var(--muted)] text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Speak with our engineering and commercial team about your
                operational requirements.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">
                {/* Direct Contact */}
                <div className="contact-info">

                  <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">
                    Direct Contact
                  </p>

                  <div className="space-y-3 mb-6">

                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="flex items-center gap-3 text-white/100 hover:text-cyan transition-colors font-mono text-base"
                    >
                      <span>📞</span>
                      {SITE.phone}
                    </a>

                    <a
                      href={gmailComposeUrl(SITE.email)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white/100 hover:text-cyan transition-colors font-mono text-base"
                    >
                      <span>✉</span>
                      {SITE.email}
                    </a>

                  </div>

                  <div>

                    <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-2">
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
                <div className="enquiry-card self-start -mt-40 lg:-mt-52 border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-5 md:p-6 rounded-sm w-full">
                  <p className="response-tag font-mono text-xs tracking-widest uppercase text-cyan mb-2">
                    Response Time
                  </p>

                  <h2 className="enquiry-title font-display text-xl md:text-2xl font-bold text-white mb-3">
                    Send an Enquiry
                  </h2>

                  <p className="enquiry-text text-[var(--muted)] leading-relaxed mb-4 text-sm">
                    Complete our secure enquiry form and our engineering team
                    will respond within two business days.
                  </p>

                  {submitted ? (
                    <div className="enquiry-btn border border-cyan/30 bg-cyan/5 px-5 py-4 text-sm text-white/90 leading-relaxed">
                      Thank you — your enquiry has been received. Our team will
                      respond within two business days.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="enquiry-btn space-y-2.5">
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
                        rows={3}
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
        </StackSection>

        <StackSection index={1}>
          <AskQuestionFormSection />
        </StackSection>

        <StackSection index={2} dim={false}>
          <AnsweredQuestionsSection />
        </StackSection>

      </main>
    </>
  )
}
