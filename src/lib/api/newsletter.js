// lib/api/newsletter.js
import apiClient from '../apiClient'

export async function subscribeToNewsletter(email) {
  const { data } = await apiClient.post('/newsletter/subscribers/', { email })
  return data
}

// ─── Staff: newsletter management (Phase 4.1) ──────────────────────────────
export async function getNewsletterSubscribers(params = {}) {
  const { data } = await apiClient.get('/newsletter/subscribers/', { params })
  return data
}

export async function getNewsletterCampaigns(params = {}) {
  const { data } = await apiClient.get('/newsletter/campaigns/', { params })
  return data
}

export async function createNewsletterCampaign(payload) {
  const { data } = await apiClient.post('/newsletter/campaigns/', payload)
  return data
}

export async function sendNewsletterCampaign(id) {
  const { data } = await apiClient.post(`/newsletter/campaigns/${id}/send/`)
  return data
}
