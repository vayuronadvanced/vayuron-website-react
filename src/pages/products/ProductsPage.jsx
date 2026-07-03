import { Helmet } from 'react-helmet-async'
import { PageBanner, InfoCard } from '../../components/ui'
import { PRODUCTS } from '../../data/siteData'
import StackSection from '../../components/sections/StackSection'

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

      {/* Stacked scroll transitions — same pattern as every other page. */}
      <main>
        <StackSection index={0}>
          <PageBanner
            eyebrow="Product Lines"
            title="Our Capabilities"
            subtitle="Six technology domains engineered for defence, security, and industrial critical operations."
            crumbs={[{ label: 'Products' }]}
            backgroundImage="/ProductPage1.png"
          />
        </StackSection>

        <StackSection index={1} dim={false}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/ProductPage2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map((product) => (
                  <InfoCard
                    key={product.id}
                    to={product.path}
                    icon={product.icon}
                    title={product.label}
                    description={product.description}
                    bullets={product.bullets}
                  />
                ))}
              </div>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
