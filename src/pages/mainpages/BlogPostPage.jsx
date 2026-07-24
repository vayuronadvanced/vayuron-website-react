{/*BlogPostPage.jsx*/ }

import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Breadcrumb } from '../../components/ui'
import { useApi } from '../../hooks'
import { getBlogPost } from '../../lib/api/blog'
import { logBusinessEvent } from '../../lib/api/analytics'
import Seo from '../../components/seo/Seo'

export default function BlogPostPage() {
  const { slug } = useParams()
  const { data: post, loading, error, run: fetchPost } = useApi(getBlogPost)

  // Fallback for the (real) data case where a post has no excerpt set —
  // description={post.excerpt} alone would render zero <meta
  // name="description"> for that post, which is exactly the class of bug
  // an SEO scan flags as "missing meta description". Strips any HTML from
  // `content` (rendered as rich text) and truncates to a safe length.
  const metaDescription =
    post?.excerpt ||
    (post?.content
      ? post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155)
      : undefined)

  useEffect(() => {
    fetchPost(slug).catch(() => {})
  }, [fetchPost, slug])

  useEffect(() => {
    if (post) {
      logBusinessEvent('blog_viewed', `/blog/${slug}`, { title: post.title })
    }
  }, [post, slug])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-[800px] px-6 space-y-4 animate-pulse">
          <div className="h-3 w-24 bg-white/10 rounded" />
          <div className="h-10 w-4/5 bg-white/10 rounded" />
          <div className="aspect-[16/9] bg-white/5 rounded-sm" />
        </div>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-black gap-4">
        <p className="text-red-400 text-sm">
          {error || 'This article could not be found.'}
        </p>
        <Link to="/blog" className="text-cyan text-sm uppercase tracking-widest hover:underline">
          ← Back to Blog
        </Link>
      </main>
    )
  }

  return (
    <>
      <Seo
        title={post.title}
        description={metaDescription}
        path={`/blog/${slug}`}
        image={post.cover_image}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          ...(post.excerpt && { description: post.excerpt }),
          ...(post.published_at && { datePublished: post.published_at }),
          ...(post.cover_image && { image: post.cover_image }),
        }}
        breadcrumbs={[{ label: 'Blog', path: '/blog' }, { label: post.title }]}
      />

      <main>
        <article className="relative pt-24 sm:pt-28 md:pt-32 pb-20 bg-black">
          <div className="relative z-10 w-full max-w-[800px] mx-auto px-6">
            <Breadcrumb crumbs={[{ label: 'Blog', path: '/blog' }, { label: post.title }]} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {post.category && (
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mt-6 mb-3">
                  {post.category.name}
                </p>
              )}

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>

              {post.published_at && (
                <p className="text-sm text-white/40 mb-8">
                  {new Date(post.published_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </motion.div>

            {post.cover_image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-10 rounded-sm overflow-hidden border border-[rgba(0,212,255,0.15)] shadow-[0_0_40px_rgba(0,212,255,0.08)]"
              >
                <img
                  src={post.cover_image}
                  alt={post.title}
                  loading="lazy"
                  width={800}
                  height={450}
                  className="w-full aspect-[16/9] object-cover"
                />
              </motion.div>
            )}

            {/* Content is authored exclusively by Admin/Employee accounts via
                the dashboard's rich text editor (Phase 4.2) — server-side
                permissions (IsAdminOrEmployee) already restrict who can write
                it, so rendering it as HTML here is safe. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-invert max-w-none text-white/85 text-[17px] leading-[1.8] [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:font-display [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-display [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5 [&_a]:text-cyan [&_a]:underline [&_a:hover]:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-6 border-t border-[rgba(0,212,255,0.1)] flex items-center justify-between">
              <Link to="/blog" className="text-cyan text-sm uppercase tracking-widest hover:underline">
                ← Back to Blog
              </Link>
              {post.category && (
                <Link
                  to={`/blog?category=${post.category.slug}`}
                  className="text-xs text-white/40 hover:text-cyan transition-colors"
                >
                  More in {post.category.name}
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
