import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageBanner } from '../../components/ui'
import { PRODUCTS } from '../../data/siteData'

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Products — Vayuron Advanced Systems</title>
        <meta
          name="description"
          content="Vayuron's core product lines: UAV Systems, Artificial Intelligence, Software Systems, Advanced Engineering, Avionics, and Carbon & Composite."
        />
      </Helmet>

      <main>
        <PageBanner
          eyebrow="Product Lines"
          title="Our Capabilities"
          subtitle="Six technology domains engineered for defence, security, and industrial critical operations."
          crumbs={[{ label: 'Products' }]}
        />

        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                to={product.path}
                className="group bg-surface border border-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.35)] p-10 transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl text-cyan mb-6">
                  {product.icon}
                </div>

                <h2 className="font-display text-2xl font-bold text-white group-hover:text-cyan transition-colors mb-3">
                  {product.label}
                </h2>

                <p className="text-muted text-sm leading-relaxed flex-1 mb-6">
                  {product.description}
                </p>

                <span className="font-mono text-xs text-cyan group-hover:text-white transition-colors">
                  Explore {product.label} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}