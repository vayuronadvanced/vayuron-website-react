{/*DashboardBlogEditorPage.jsx*/ }

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import RichTextEditor from '../../components/dashboard/RichTextEditor'
import { useApi } from '../../hooks'
import {
  createBlogCategory,
  createBlogPost,
  getBlogCategories,
  getBlogPost,
  updateBlogPost,
} from '../../lib/api/blog'

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

const initialForm = {
  title: '',
  slug: '',
  category: '',
  excerpt: '',
  content: '',
}

export default function DashboardBlogEditorPage() {
  const { slug: editingSlug } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(editingSlug)

  const [form, setForm] = useState(initialForm)
  const [coverImage, setCoverImage] = useState(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const { data: categoriesData, run: fetchCategories } = useApi(getBlogCategories)
  const { run: fetchPost } = useApi(getBlogPost)
  const { run: create } = useApi(createBlogPost)
  const { run: update } = useApi(updateBlogPost)
  const { run: addCategory } = useApi(createBlogCategory)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const categories = categoriesData?.results || categoriesData || []

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (!isEditing) return
    fetchPost(editingSlug).then((post) => {
      setForm({
        title: post.title || '',
        slug: post.slug || '',
        category: post.category?.id || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
      })
      setSlugManuallyEdited(true)
    })
  }, [isEditing, editingSlug, fetchPost])

  const handleTitleChange = (title) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : slugify(title),
    }))
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    const category = await addCategory({
      name: newCategoryName,
      slug: slugify(newCategoryName),
    })
    setNewCategoryName('')
    fetchCategories()
    setForm((prev) => ({ ...prev, category: category.id }))
  }

  const buildPayload = () => {
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('slug', form.slug)
    formData.append('excerpt', form.excerpt)
    formData.append('content', form.content)
    if (form.category) formData.append('category', form.category)
    if (coverImage) formData.append('cover_image', coverImage)
    return formData
  }

  const handleSave = async () => {
    setError(null)
    setSaving(true)
    try {
      if (isEditing) {
        await update(editingSlug, buildPayload())
      } else {
        await create(buildPayload())
      }
      navigate('/dashboard/blog')
    } catch (err) {
      const data = err?.response?.data
      setError(
        data && typeof data === 'object'
          ? Object.values(data).flat().join(' ')
          : 'Failed to save post.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Edit Post' : 'New Post'} — Dashboard</title>
      </Helmet>

      <DashboardLayout title={isEditing ? 'Edit Post' : 'New Post'}>
        <div className="max-w-3xl space-y-4">
          <input
            type="text"
            placeholder="Post title"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
          />

          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">
              URL slug (auto-generated from title, editable)
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugManuallyEdited(true)
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Category</label>
            <div className="flex gap-2">
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="flex-1 bg-black/60 border border-cyan/20 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyan"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 bg-black/60 border border-cyan/20 px-3 py-1.5 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="border border-cyan/40 text-cyan px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">
              Excerpt (shown on the blog listing card)
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Cover image</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="w-full text-sm text-white/100 file:mr-3 file:border file:border-cyan/40 file:bg-black/60 file:text-cyan file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-widest"
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
            />
          </div>

          {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !form.title || !form.slug}
              className="border border-cyan text-cyan px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/blog')}
              className="border border-white/20 text-white/100 px-6 py-2.5 text-xs uppercase tracking-widest hover:border-white/40 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
