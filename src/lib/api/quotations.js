// lib/api/quotations.js
import apiClient from '../apiClient'

export async function submitQuotationRequest(payload) {
  const { data } = await apiClient.post('/quotations/', payload)
  return data
}

// ─── Staff: quotation management (Phase 4.1/4.3) ───────────────────────────
export async function getQuotationRequests(params = {}) {
  const { data } = await apiClient.get('/quotations/', { params })
  return data
}

export async function updateQuotationRequest(id, payload) {
  const { data } = await apiClient.patch(`/quotations/${id}/`, payload)
  return data
}
