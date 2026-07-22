{/*BlogPage.jsx*/ }

import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { PageBanner, SectionHeader, CardGrid } from '../../components/ui'
import { useApi } from '../../hooks'
import { getBlogCategories, getBlogPosts } from '../../lib/api/blog'
import Seo from '../../components/seo/Seo'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function CardSkeleton() {
  return (
    <div className="border border-[rgba(0,212,255,0.1)] bg-[rgba(0,212,255,0.02)] rounded-sm overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-2.5 w-20 bg-white/10 rounded" />
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-3 w-4/5 bg-white/5 rounded" />
        <div className="h-3 w-3/5 bg-white/5 rounded" />
      </div>
    </div>
  )
}

function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative flex flex-col h-full border border-[rgba(0,212,255,0.12)] bg-[rgba(0,0,0,0.45)] rounded-sm overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-[rgba(0,0,0,0.55)] hover:-translate-y-1"
      >
        <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full z-10" />
        <div className="aspect-[16/9] overflow-hidden bg-white/5 relative">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan/5 to-black">
              <span className="font-display text-4xl text-cyan/20">VAYURON</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex flex-col flex-1 p-5">
          {post.category && (
            <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">
              {post.category.name}
            </p>
          )}
          <h3 className="font-display text-lg text-white mb-2 leading-snug group-hover:text-cyan transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            {post.published_at && (
              <p className="text-xs text-white/100">{formatDate(post.published_at)}</p>
            )}
            <span className="text-xs text-cyan opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function FeaturedPost({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative grid md:grid-cols-2 gap-0 border border-[rgba(0,212,255,0.12)] bg-[rgba(0,0,0,0.5)] rounded-sm overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:bg-[rgba(0,0,0,0.6)] hover:-translate-y-1"
      >
        <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:w-full z-10" />
        <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-white/5 relative">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan/10 to-black min-h-[240px]">
              <span className="font-display text-5xl text-cyan/20">VAYURON</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">
            Featured{post.category ? ` · ${post.category.name}` : ''}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-cyan transition-colors">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-white/100 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-4">
            {post.published_at && (
              <p className="text-xs text-white/40">{formatDate(post.published_at)}</p>
            )}
            <span className="text-sm text-cyan group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1">
              Read full article →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')

  const setActiveCategory = (slug) => {
    if (slug) {
      setSearchParams({ category: slug })
    } else {
      setSearchParams({})
    }
  }

  const { data: postsData, loading, error, run: fetchPosts } = useApi(getBlogPosts)
  const { data: categoriesData, run: fetchCategories } = useApi(getBlogCategories)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchPosts(activeCategory ? { category: activeCategory } : {})
  }, [fetchPosts, activeCategory])

  const posts = postsData?.results || postsData || []
  const categories = categoriesData?.results || categoriesData || []

  const [featured, ...rest] = posts
  const showFeatured = Boolean(featured) && !activeCategory

  return (
    <>
      <Seo
        title="Blog — Engineering Insights & Company Updates"
        description="Insights, updates, and engineering perspectives from Vayuron Advanced Systems."
        path="/blog"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <main>
        <PageBanner
          eyebrow="Insights"
          title="Blog"
          subtitle="Engineering perspectives, product updates, and news from Vayuron Advanced Systems."
          crumbs={[{ label: 'Blog' }]}
          backgroundVideoMp4="/videos/Drone4.webm"
        // backgroundImage="/images/FixedWingDRone.webp"
        />

        <section className="relative py-16 sm:py-20 md:py-24 bg-black">
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
            <SectionHeader eyebrow="Latest" title="All Articles" className="mb-8" />

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest border rounded-sm transition-all ${activeCategory === null
                    ? 'border-cyan bg-cyan text-black shadow-[0_0_16px_rgba(0,212,255,0.35)]'
                    : 'border-cyan/30 text-cyan hover:border-cyan hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-4 py-1.5 text-xs uppercase tracking-widest border rounded-sm transition-all ${activeCategory === cat.slug
                      ? 'border-cyan bg-cyan text-black shadow-[0_0_16px_rgba(0,212,255,0.35)]'
                      : 'border-cyan/30 text-cyan hover:border-cyan hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}

            {error && (
              <p className="text-center text-red-400 text-sm py-10">{error}</p>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
                <p className="font-display text-xl text-white/100 mb-2">Nothing published yet</p>
                <p className="text-sm text-[var(--muted)]">Check back soon for updates.</p>
              </div>
            )}

            {!loading && !error && posts.length > 0 && (
              <>
                {showFeatured && <FeaturedPost post={featured} />}
                <CardGrid gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(showFeatured ? rest : posts).map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </CardGrid>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
