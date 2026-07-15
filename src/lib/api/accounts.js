// lib/api/accounts.js
import apiClient, { tokenStorage } from '../apiClient'

export async function register(payload) {
  const { data } = await apiClient.post('/accounts/register/', payload)
  return data
}

export async function login({ username, password }) {
  const { data } = await apiClient.post('/accounts/token/', { username, password })
  tokenStorage.setTokens(data.access, data.refresh)
  return data
}

export function logout() {
  tokenStorage.clear()
}

export async function getMe() {
  const { data } = await apiClient.get('/accounts/me/')
  return data
}

export async function updateMe(payload) {
  const { data } = await apiClient.patch('/accounts/me/', payload)
  return data
}

// ─── Admin: user management (Phase 4.1.3) ──────────────────────────────────
export async function getUsers(params = {}) {
  const { data } = await apiClient.get('/accounts/users/', { params })
  return data
}

export async function updateUser(id, payload) {
  const { data } = await apiClient.patch(`/accounts/users/${id}/`, payload)
  return data
}
