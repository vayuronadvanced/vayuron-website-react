{/*JobListingPage.jsx*/ }

// Gives each job listing its own crawlable, shareable URL (/careers/:slug) —
// previously all listings lived only inline on /careers with no individual
// URL, which meant JobPosting schema couldn't validate (Google requires a
// unique resolvable URL per posting) and listings couldn't be shared/linked
// directly. The application form itself is the same fields/behavior that
// used to live inline on CareersPage, just moved here.

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApi } from '../../hooks'
import { getJobListing, submitJobApplication } from '../../lib/api/careers'
import { logBusinessEvent } from '../../lib/api/analytics'
import { trackEvent } from '../../lib/googleAnalytics'
import { Breadcrumb } from '../../components/ui'
import Seo from '../../components/seo/Seo'
import { SITE } from '../../data/siteData'

const initialApplication = {
  full_name: '',
  email: '',
  phone_number: '',
  education: '',
  experience: '',
  skills: '',
  cover_letter: '',
}

export default function JobListingPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: listing, loading, error, run: fetchListing } = useApi(getJobListing)
  const [application, setApplication] = useState(initialApplication)
  const [resume, setResume] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const { loading: applying, error: applyError, run: apply } = useApi(submitJobApplication)

  useEffect(() => {
    fetchListing(slug)
  }, [fetchListing, slug])

  const handleChange = (e) => {
    setApplication((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!resume || !listing) return

    const formData = new FormData()
    formData.append('job_listing', listing.id)
    Object.entries(application).forEach(([key, value]) => formData.append(key, value))
    formData.append('resume', resume)

    try {
      await apply(formData)
      setSubmitted(true)
      setApplication(initialApplication)
      setResume(null)
      logBusinessEvent('application_submitted')
      trackEvent('generate_lead', { form_name: 'job_application', job_title: listing.title })
    } catch {
      // error state already surfaced via applyError
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-[var(--muted)] text-sm">Loading position…</p>
      </main>
    )
  }

  if (error || !listing) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-black gap-4">
        <p className="text-red-400 text-sm">
          {error || 'This position could not be found — it may have closed.'}
        </p>
        <Link to="/careers" className="text-cyan text-sm uppercase tracking-widest hover:underline">
          ← Back to Careers
        </Link>
      </main>
    )
  }

  const metaBits = [listing.department, listing.location, listing.employment_type].filter(Boolean)

  return (
    <>
      <Seo
        title={listing.title}
        description={listing.description?.slice(0, 160) || `${listing.title} at ${SITE.name}`}
        path={`/careers/${slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: listing.title,
          description: listing.description,
          datePosted: listing.created_at,
          employmentType: listing.employment_type || undefined,
          hiringOrganization: {
            '@type': 'Organization',
            name: SITE.name,
            sameAs: SITE.url,
          },
          ...(listing.location && {
            jobLocation: {
              '@type': 'Place',
              address: { '@type': 'PostalAddress', addressLocality: listing.location, addressCountry: 'IN' },
            },
          }),
        }}
      />

      <main className="min-h-screen bg-black pt-24 sm:pt-28 md:pt-32 pb-20">
        <div className="w-full max-w-[800px] mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'Careers', path: '/careers' }, { label: listing.title }]} />

          <h1 className="font-display text-3xl md:text-4xl text-white mt-4">{listing.title}</h1>
          {metaBits.length > 0 && (
            <p className="text-sm text-[var(--muted)] mt-2">{metaBits.join(' · ')}</p>
          )}

          {listing.description && (
            <p className="text-[var(--muted)] leading-relaxed mt-6 whitespace-pre-line">
              {listing.description}
            </p>
          )}

          {listing.requirements && (
            <>
              <h2 className="font-display text-lg text-white mt-8 mb-2">Requirements</h2>
              <p className="text-[var(--muted)] leading-relaxed whitespace-pre-line">
                {listing.requirements}
              </p>
            </>
          )}

          <div className="mt-10 border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-6 md:p-8 rounded-sm">
            <h2 className="font-display text-xl text-white mb-1">Apply for this position</h2>

            {submitted ? (
              <div>
                <p className="text-sm text-cyan/90 leading-relaxed mt-4">
                  Thank you — your application has been received. Our team will review it and
                  reach out if there&apos;s a fit.
                </p>
                <button
                  onClick={() => navigate('/careers')}
                  className="mt-6 text-cyan text-sm uppercase tracking-widest hover:underline"
                >
                  ← Back to all openings
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                <input
                  type="text" name="full_name" required placeholder="Full name *"
                  value={application.full_name} onChange={handleChange}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email" name="email" required placeholder="Email address *"
                    value={application.email} onChange={handleChange}
                    className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                  />
                  <input
                    type="tel" name="phone_number" placeholder="Phone"
                    value={application.phone_number} onChange={handleChange}
                    className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                  />
                </div>
                <textarea
                  name="education" rows={2} placeholder="Education"
                  value={application.education} onChange={handleChange}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
                />
                <textarea
                  name="experience" rows={2} placeholder="Experience"
                  value={application.experience} onChange={handleChange}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
                />
                <input
                  type="text" name="skills" placeholder="Key skills"
                  value={application.skills} onChange={handleChange}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                />
                <textarea
                  name="cover_letter" rows={3} placeholder="Cover letter (optional)"
                  value={application.cover_letter} onChange={handleChange}
                  className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
                />
                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">
                    Resume (PDF/DOC, max 10MB) *
                  </label>
                  <input
                    type="file" required accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="w-full text-sm text-white/80 file:mr-3 file:border file:border-cyan/40 file:bg-black/60 file:text-cyan file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-widest"
                  />
                </div>

                {applyError && <p className="text-xs text-red-400 leading-relaxed">{applyError}</p>}

                <button
                  type="submit" disabled={applying}
                  className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applying ? 'Submitting…' : 'Submit Application →'}
                </button>
              </form>
            )}
          </div>

          <Link to="/careers" className="inline-block mt-8 text-sm text-[var(--muted)] hover:text-cyan hover:underline">
            ← Back to all openings
          </Link>
        </div>
      </main>
    </>
  )
}
