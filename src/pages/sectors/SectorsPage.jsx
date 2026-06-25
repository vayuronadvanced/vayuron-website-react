import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageBanner, CTAButton } from '../../components/ui'
import { SECTORS } from '../../data/siteData'

const sectorIcons = {
  'defence-security':          '🛡',
  'smart-cities':              '🏙',
  'municipal-operations':      '🏛',
  'infrastructure-monitoring': '🔌',
  'agriculture':               '🌾',
  'disaster-management':       '🚨',
  'environmental-monitoring':  '🌿',
  'industrial-inspection':     '🏭',
}

const sectorDescriptions = {
  'defence-security':          'Autonomous ISR, AI target detection, and encrypted C2 software for national security.',
  'smart-cities':              'UAV monitoring, traffic analytics, and crowd intelligence for urban management.',
  'municipal-operations':      'Asset inspection, mapping, and maintenance solutions for local governments.',
  'infrastructure-monitoring': 'Automated inspection of power lines, pipelines, bridges, and rail.',
  'agriculture':               'Precision spray drones, multispectral crop health mapping, and yield AI.',
  'disaster-management':       'Rapid-deploy rescue UAVs, damage assessment, and relief coordination.',
  'environmental-monitoring':  'Ecological surveys, emissions detection, and environmental compliance platforms.',
  'industrial-inspection':     'Confined-space and ex-zone inspection UAVs for oil & gas and heavy industry.',
}

export default function SectorsPage() {
  return (
    <>
      <Helmet>
        <title>Sectors — Vayuron Advanced Systems</title>
        <meta name="description" content="Vayuron deploys autonomous UAV and AI solutions across 8 critical sectors including Defence, Smart Cities, Agriculture, and Industrial Inspection." />
      </Helmet>
      <main>
        <PageBanner
          eyebrow="Operational Domains"
          title="Sectors We Serve"
          subtitle="Eight critical industries where Vayuron deploys autonomous intelligence at scale."
          crumbs={[{ label: 'Sectors' }]}
        />

        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SECTORS.map((sector) => (
              <Link
                key={sector.id}
                to={sector.path}
                className="group bg-surface border border-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.4)] p-8 transition-all duration-300 flex flex-col"
              >
                <div className="text-3xl mb-4">{sectorIcons[sector.id]}</div>
                <h2 className="font-display text-lg font-bold text-white group-hover:text-cyan transition-colors mb-3">
                  {sector.label}
                </h2>
                <p className="text-muted text-xs leading-relaxed flex-1 mb-6">
                  {sectorDescriptions[sector.id]}
                </p>
                <span className="font-mono text-xs text-cyan group-hover:text-white transition-colors">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-16 bg-surface border-t border-[rgba(0,212,255,0.1)] text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Don't See Your Sector?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Our technology is adaptable to new operational domains. Talk to our team about your specific requirements.
          </p>
          <CTAButton to="/contact" variant="primary">Discuss Your Use Case</CTAButton>
        </section>
      </main>
    </>
  )
}
