/*CareerPage.jsx*/

import { Link } from 'react-router-dom'
import { Breadcrumb, SectionHeader } from '../../components/ui'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useApi } from '../../hooks'
import { getJobListings } from '../../lib/api/careers'
import Seo from '../../components/seo/Seo'

export default function CareersPage() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)

  const {
    data: listingsData,
    loading: listingsLoading,
    run: fetchListings,
  } = useApi(getJobListings)

  useEffect(() => {
    fetchListings({ status: 'open' })
  }, [fetchListings])

  const listings = listingsData?.results || listingsData || []

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
      <Seo
        description="Join Vayuron Advanced Systems — careers in autonomous UAV engineering, AI, and defence-grade systems in Bhopal, India."
        path="/careers"
        breadcrumbs={[{ label: 'Careers' }]}
      />

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
              backgroundImage: "url('/images/career2.webp')",
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
                as="h1"
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
                    <Link
                      to={`/careers/${listing.slug}`}
                      className="shrink-0 border border-cyan text-cyan px-5 py-2 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all"
                    >
                      View & Apply
                    </Link>
                  </div>

                  {listing.description && (
                    <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
                      {listing.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}