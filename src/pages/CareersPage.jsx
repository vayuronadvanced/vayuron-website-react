/*CareerPage.jsx*/

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Breadcrumb, SectionHeader } from '../components/ui'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CareersPage() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)

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
      </main>
    </>
  )
}