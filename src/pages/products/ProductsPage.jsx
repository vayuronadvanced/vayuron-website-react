{/*ProductsPage.jsx - PHASE 2 UPDATE*/ }

import { PageBanner, InfoCard, CardGrid } from '../../components/ui'
import { PRODUCTS } from '../../data/siteData'
import StackSection from '../../components/sections/StackSection'
import Seo from '../../components/seo/Seo'

export default function ProductsPage() {
  return (
    <>
      <Seo
        title="Product Lines — UAV Systems, MVTX, AI & Engineering"
        description="Vayuron's core product lines: UAV Systems, MVTX, Artificial Intelligence, and Advanced Engineering."
        path="/products"
        breadcrumbs={[{ label: 'Products' }]}
      />

      {/* Stacked scroll transitions — same pattern as every other page. */}
      <main>
        <StackSection index={0}>
          <PageBanner
            eyebrow="Product Lines"
            title="Autonomous Systems & Defence Products"
            subtitle="Various technology domains engineered for defence, security, and industrial critical operations."
            crumbs={[{ label: 'Products' }]}
            backgroundImage="/images/ProductPage1.webp"
          />
        </StackSection>

        <StackSection index={1} dim={false}>
          <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/ProductPage2.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
              {/* Exactly 4 products: UAV Systems, MVTX, Artificial Intelligence, Advanced Engineering */}
              {/* UPDATED: Wrapped in CardGrid for premium hover effects (16px lift) */}
              <CardGrid>
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
              </CardGrid>
            </div>
          </section>
        </StackSection>
      </main>
    </>
  )
}
