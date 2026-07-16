{/* SectorsPage.jsx - PHASE 2 UPDATE */}

import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton, InfoCard, CardGrid } from '../../components/ui'
import { SECTORS } from '../../data/siteData'
import StackSection from '../../components/sections/StackSection'

export default function SectorsPage() {
  return (
    <>
      <Helmet>
        <title>Sectors — Vayuron Advanced Systems</title>
        <meta name="description" content="Vayuron deploys autonomous UAV and AI solutions across 8 critical sectors including Defence, Smart Cities, Agriculture, and Industrial Inspection." />
      </Helmet>

      {/* Stacked scroll transitions — same pattern as every other page. */}
      <main>
        <StackSection index={0}>
          <PageBanner
            eyebrow="Operational Domains"
            title="Sectors We Serve"
            subtitle="Eight critical industries where Vayuron deploys autonomous intelligence at scale."
            crumbs={[{ label: 'Sectors' }]}
            backgroundImage="/Operational.png"
          />
        </StackSection>

        <StackSection index={1}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/RightDrone.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-10 sm:py-16 md:py-24">
              {/* UPDATED: Wrapped in CardGrid for premium hover effects (16px lift) */}
              <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SECTORS.map((sector) => (
                  <InfoCard
                    key={sector.id}
                    to={sector.path}
                    icon={sector.icon}
                    title={sector.label}
                    description={sector.description}
                    bullets={sector.bullets}
                    className="p-5"
                  />
                ))}
              </CardGrid>
            </div>
          </section>
        </StackSection>

        <StackSection index={2} dim={false}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-center">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Quadcopter.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 max-w-2xl mx-auto px-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Don&apos;t See Your Sector?
              </h2>
              <p className="text-muted mb-8 max-w-xl mx-auto">
                Our technology is adaptable to new operational domains. Talk to our team about your specific requirements.
              </p>
              <CTAButton to="/contact" variant="primary">Discuss Your Use Case</CTAButton>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
