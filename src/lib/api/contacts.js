// lib/api/contacts.js
import apiClient from '../apiClient'

export async function submitContactEnquiry(payload) {
  const { data } = await apiClient.post('/contacts/', payload)
  return data
}

// ─── Staff: enquiry management (Phase 4.1/4.3) ─────────────────────────────
export async function getContactEnquiries(params = {}) {
  const { data } = await apiClient.get('/contacts/', { params })
  return data
}

export async function updateContactEnquiry(id, payload) {
  const { data } = await apiClient.patch(`/contacts/${id}/`, payload)
  return data
}
