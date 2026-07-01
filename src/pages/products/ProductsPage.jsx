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
          backgroundImage="/ProductPage1.png"
        />

        {/* Products */}
        <section className="relative min-h-screen flex items-center overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/ProductPage2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Overlay : <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />*/}
          

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {PRODUCTS.map((product) => (
                <Link
                  key={product.id}
                  to={product.path}
                  className="group relative rounded-lg border border-[rgba(0,212,255,0.12)] bg-black/20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-black/30 hover:-translate-y-1 p-8">                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />

                  <div className="text-cyan text-3xl mb-5 transition-transform duration-300 group-hover:scale-110">
                    {product.icon}
                  </div>

                  <h2 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">                    {product.label}
                  </h2>

                  <p className="text-white/75 text-sm leading-relaxed mb-6 group-hover:text-white transition-colors">
                    {product.description}
                  </p>

                  <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan group-hover:text-white transition-colors">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              ))}

            </div>

          </div>

        </section>
      </main>
    </>
  )
}
