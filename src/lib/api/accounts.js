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

// ─── Password reset ─────────────────────────────────────────────────────────
export async function requestPasswordReset(email) {
  const { data } = await apiClient.post('/accounts/password-reset/', { email })
  return data
}

export async function confirmPasswordReset({ uid, token, new_password }) {
  const { data } = await apiClient.post('/accounts/password-reset/confirm/', {
    uid,
    token,
    new_password,
  })
  return data
}

// ─── Email verification ─────────────────────────────────────────────────────
export async function resendVerificationEmail(email) {
  const { data } = await apiClient.post('/accounts/email-verification/resend/', { email })
  return data
}

export async function confirmEmailVerification({ uid, token }) {
  const { data } = await apiClient.post('/accounts/email-verification/confirm/', { uid, token })
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
