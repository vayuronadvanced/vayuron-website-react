/*CareerPage.jsx*/

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Breadcrumb, SectionHeader } from '../components/ui'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useApi } from '../hooks'
import { getJobListings, submitJobApplication } from '../lib/api/careers'
import { logBusinessEvent } from '../lib/api/analytics'
import { trackEvent } from '../lib/googleAnalytics'

const initialApplication = {
  full_name: '',
  email: '',
  phone_number: '',
  education: '',
  experience: '',
  skills: '',
  cover_letter: '',
}

export default function CareersPage() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const [selectedListing, setSelectedListing] = useState(null)
  const [application, setApplication] = useState(initialApplication)
  const [resume, setResume] = useState(null)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const {
    data: listingsData,
    loading: listingsLoading,
    run: fetchListings,
  } = useApi(getJobListings)
  const {
    loading: applying,
    error: applyError,
    run: apply,
  } = useApi(submitJobApplication)

  useEffect(() => {
    fetchListings({ status: 'open' })
  }, [fetchListings])

  const listings = listingsData?.results || listingsData || []

  const handleApplicationChange = (e) => {
    setApplication((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    if (!resume) return

    const formData = new FormData()
    formData.append('job_listing', selectedListing.id)
    Object.entries(application).forEach(([key, value]) => formData.append(key, value))
    formData.append('resume', resume)

    try {
      await apply(formData)
      setApplicationSubmitted(true)
      setApplication(initialApplication)
      setResume(null)
      logBusinessEvent('application_submitted')
      trackEvent('generate_lead', { form_name: 'job_application', job_title: selectedListing.title })
    } catch {
      // error state is already surfaced via applyError
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [
          '.career-breadcrumb',
          '.career-tag',
          '.career-title',
          '.career-text',
          '.career-btn',
        ],
        {
          opacity: 0,
          y: 30,
        }
      )

      gsap.set(bgRef.current, {
        scale: 1.1,
      })

      // Faster animation timeline
      const tl = gsap.timeline()

      tl.to(bgRef.current, {
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })

        .to(
          '.career-breadcrumb',
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          '-=1'
        )

        .to(
          '.career-tag',
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          '-=0.15'
        )

        .to(
          '.career-title',
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
          },
          '-=0.15'
        )

        .to(
          '.career-text',
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
          '-=0.15'
        )

        .fromTo(
          '.career-btn',
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.5)',
          },
          '-=0.1'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>Careers — Vayuron Advanced Systems</title>
      </Helmet>

      <main>
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-[rgba(0,212,255,0.1)]"
        >
          {/* Animated Background */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/career2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Cyan Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-30" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 text-center">
            <div className="career-breadcrumb mb-6 flex justify-center">
              <Breadcrumb crumbs={[{ label: 'Careers' }]} />
            </div>

            <p className="career-tag font-mono text-xs tracking-widest uppercase text-cyan mb-3">
              Careers
            </p>

            <div className="career-title">
              <SectionHeader
                title="We're Hiring"
                centered
                className="mb-6"
              />
            </div>

            <p className="career-text mt-1 max-w-2xl mx-auto text-[var(--muted)] text-base md:text-lg leading-relaxed">
              Join Vayuron Advanced Systems and help shape the next generation
              of autonomous technologies. Check our latest job openings on
              LinkedIn, or contact us directly to learn more about opportunities
              to work with us.
            </p>

            <Link
              to="/contact"
              className="career-btn mt-10 inline-block px-8 py-3 border border-[var(--cyan)] text-[var(--cyan)] text-sm tracking-widest uppercase hover:bg-[var(--cyan)] hover:text-[var(--black)] transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* Open Positions */}
        <section className="relative py-16 sm:py-20 md:py-24 bg-black border-b border-[rgba(0,212,255,0.1)]">
          <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6">
            <SectionHeader eyebrow="Open Positions" title="Current Openings" centered className="mb-10" />

            {listingsLoading && (
              <p className="text-center text-[var(--muted)] text-sm">Loading open positions…</p>
            )}

            {!listingsLoading && listings.length === 0 && (
              <p className="text-center text-[var(--muted)] text-sm">
                No open positions right now. Check back soon, or reach out via
                the Contact page to introduce yourself.
              </p>
            )}

            <div className="space-y-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="group relative border border-[rgba(0,212,255,0.12)] bg-[rgba(0,0,0,0.45)] backdrop-blur-lg p-5 sm:p-6 rounded-sm transition-all duration-300 hover:border-cyan/50 hover:bg-black/55 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg text-white/100">{listing.title}</h3>
                      <p className="text-xs text-[var(--muted)] mt-1">
                        {[listing.department, listing.location, listing.employment_type]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setApplicationSubmitted(false)
                      }}
                      className="shrink-0 border border-cyan text-cyan px-5 py-2 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all"
                    >
                      {selectedListing?.id === listing.id ? 'Selected' : 'Apply'}
                    </button>
                  </div>

                  {listing.description && (
                    <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
                      {listing.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Application Form */}
            {selectedListing && (
              <div className="mt-10 border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-6 md:p-8 rounded-sm">
                <h3 className="font-display text-xl text-white mb-1">
                  Apply — {selectedListing.title}
                </h3>

                {applicationSubmitted ? (
                  <p className="text-sm text-cyan/90 leading-relaxed mt-4">
                    Thank you — your application has been received. Our team
                    will review it and reach out if there&apos;s a fit.
                  </p>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="space-y-3 mt-4">
                    <input
                      type="text"
                      name="full_name"
                      required
                      placeholder="Full name *"
                      value={application.full_name}
                      onChange={handleApplicationChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email address *"
                        value={application.email}
                        onChange={handleApplicationChange}
                        className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                      />
                      <input
                        type="tel"
                        name="phone_number"
                        placeholder="Phone"
                        value={application.phone_number}
                        onChange={handleApplicationChange}
                        className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                      />
                    </div>
                    <textarea
                      name="education"
                      rows={2}
                      placeholder="Education"
                      value={application.education}
                      onChange={handleApplicationChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
                    />
                    <textarea
                      name="experience"
                      rows={2}
                      placeholder="Experience"
                      value={application.experience}
                      onChange={handleApplicationChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
                    />
                    <input
                      type="text"
                      name="skills"
                      placeholder="Key skills"
                      value={application.skills}
                      onChange={handleApplicationChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                    />
                    <textarea
                      name="cover_letter"
                      rows={3}
                      placeholder="Cover letter (optional)"
                      value={application.cover_letter}
                      onChange={handleApplicationChange}
                      className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
                    />

                    <div>
                      <label className="block text-xs text-[var(--muted)] mb-1">
                        Resume (PDF/DOC, max 10MB) *
                      </label>
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                        className="w-full text-sm text-white/80 file:mr-3 file:border file:border-cyan/40 file:bg-black/60 file:text-cyan file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-widest"
                      />
                    </div>

                    {applyError && (
                      <p className="text-xs text-red-400 leading-relaxed">{applyError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={applying}
                      className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {applying ? 'Submitting…' : 'Submit Application →'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}