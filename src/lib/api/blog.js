// lib/api/blog.js
import apiClient from '../apiClient'

export async function getBlogPosts(params = {}) {
  const { data } = await apiClient.get('/blog/posts/', { params })
  return data
}

export async function getBlogPost(slug) {
  const { data } = await apiClient.get(`/blog/posts/${slug}/`)
  return data
}

export async function getBlogCategories() {
  const { data } = await apiClient.get('/blog/categories/')
  return data
}

export async function createBlogCategory(payload) {
  const { data } = await apiClient.post('/blog/categories/', payload)
  return data
}

// ─── Staff: blog CMS (Phase 4.1/4.2) ────────────────────────────────────────
export async function getAllBlogPosts(params = {}) {
  // Staff see drafts too (enforced server-side by BlogPostViewSet.get_queryset).
  const { data } = await apiClient.get('/blog/posts/', { params })
  return data
}

// payload should be a FormData instance when it includes a cover_image file.
export async function createBlogPost(payload) {
  const isFormData = payload instanceof FormData
  const { data } = await apiClient.post('/blog/posts/', payload, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
  })
  return data
}

export async function updateBlogPost(slug, payload) {
  const isFormData = payload instanceof FormData
  const { data } = await apiClient.patch(`/blog/posts/${slug}/`, payload, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
  })
  return data
}

export async function deleteBlogPost(slug) {
  await apiClient.delete(`/blog/posts/${slug}/`)
}

export async function publishBlogPost(slug) {
  const { data } = await apiClient.post(`/blog/posts/${slug}/publish/`)
  return data
}
