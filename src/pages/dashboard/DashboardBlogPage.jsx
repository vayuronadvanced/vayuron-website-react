{/*DashboardBlogPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatusBadge from '../../components/dashboard/StatusBadge'
import { useApi } from '../../hooks'
import { deleteBlogPost, getAllBlogPosts, publishBlogPost } from '../../lib/api/blog'

export default function DashboardBlogPage() {
  const { data, loading, error, run: fetchPosts } = useApi(getAllBlogPosts)
  const { run: publish } = useApi(publishBlogPost)
  const { run: remove } = useApi(deleteBlogPost)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const posts = data?.results || data || []

  const handlePublish = async (slug) => {
    await publish(slug)
    fetchPosts()
  }

  const handleDelete = async (slug) => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    await remove(slug)
    fetchPosts()
  }

  return (
    <>
      <Helmet>
        <title>Blog — Dashboard</title>
      </Helmet>

      <DashboardLayout title="Blog Posts">
        <Link
          to="/dashboard/blog/new"
          className="inline-block mb-6 border border-cyan text-cyan px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
        >
          + New Post
        </Link>

        {loading && <p className="text-sm text-[var(--muted)]">Loading…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {!loading && posts.length === 0 && (
          <p className="text-sm text-[var(--muted)]">
            No posts yet. Create one via the Django admin for now.
          </p>
        )}

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-4 rounded-sm flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="text-white font-medium">{post.title}</p>
                {post.category && (
                  <p className="text-xs text-cyan mt-1">{post.category.name}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={post.status} />
                <Link
                  to={`/dashboard/blog/${post.slug}/edit`}
                  className="border border-white/20 text-white/70 px-3 py-1.5 text-xs uppercase tracking-widest hover:border-cyan hover:text-cyan transition-all"
                >
                  Edit
                </Link>
                {post.status !== 'published' && (
                  <button
                    onClick={() => handlePublish(post.slug)}
                    className="border border-cyan text-cyan px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
                  >
                    Publish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="border border-red-400/40 text-red-300 px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-red-400/10 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  )
}
