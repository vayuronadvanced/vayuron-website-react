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

// ─── Ask a Question (Contact page FAQ feature) ─────────────────────────────
export async function submitQuestion(payload) {
  const { data } = await apiClient.post('/contacts/questions/', payload)
  return data
}

// Public: only ever returns published questions (enforced server-side).
export async function getPublishedQuestions(params = {}) {
  const { data } = await apiClient.get('/contacts/questions/', { params })
  return data
}

// ─── Staff: question management (edit/answer/publish) ─────────────────────
export async function getAllQuestions(params = {}) {
  const { data } = await apiClient.get('/contacts/questions/', { params })
  return data
}

export async function updateQuestion(id, payload) {
  const { data } = await apiClient.patch(`/contacts/questions/${id}/`, payload)
  return data
}

export async function publishQuestion(id) {
  const { data } = await apiClient.post(`/contacts/questions/${id}/publish/`)
  return data
}

export async function deleteQuestion(id) {
  await apiClient.delete(`/contacts/questions/${id}/`)
}
