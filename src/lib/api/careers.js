// lib/api/careers.js
import apiClient from '../apiClient'

export async function getJobListings(params = {}) {
  const { data } = await apiClient.get('/careers/listings/', { params })
  return data
}

export async function getJobListing(slug) {
  const { data } = await apiClient.get(`/careers/listings/${slug}/`)
  return data
}

// payload should be a FormData instance when it includes resume/certificate files.
export async function submitJobApplication(payload) {
  const isFormData = payload instanceof FormData
  const { data } = await apiClient.post('/careers/applications/', payload, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
  })
  return data
}

// ─── Staff: application management (Phase 4.1/4.3) ─────────────────────────
export async function getJobApplications(params = {}) {
  const { data } = await apiClient.get('/careers/applications/', { params })
  return data
}

export async function updateJobApplication(id, payload) {
  const { data } = await apiClient.patch(`/careers/applications/${id}/`, payload)
  return data
}

export async function createJobListing(payload) {
  const { data } = await apiClient.post('/careers/listings/', payload)
  return data
}

export async function updateJobListing(slug, payload) {
  const { data } = await apiClient.patch(`/careers/listings/${slug}/`, payload)
  return data
}
