// lib/apiClient.js
// Centralized Axios instance for all backend communication (Phase 3.1).
// Every API call in the app should go through this client rather than
// calling axios/fetch directly, so base URL, auth headers, and error
// handling stay consistent in one place.

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

const ACCESS_TOKEN_KEY = 'vayuron_access_token'
const REFRESH_TOKEN_KEY = 'vayuron_refresh_token'

// ─── Token storage helpers ──────────────────────────────────────────────────
// Centralized here so the storage mechanism (currently localStorage) can be
// swapped later (e.g. httpOnly cookies) without touching call sites.
export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (access, refresh) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach the access token to every outgoing request, if present.
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On a 401, try exactly one silent refresh using the refresh token, then
// retry the original request. If the refresh itself fails, clear tokens
// and let the error propagate (the app's auth context handles logout).
let refreshPromise = null

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error

    if (response?.status !== 401 || config._retried) {
      return Promise.reject(error)
    }

    const refreshToken = tokenStorage.getRefresh()
    if (!refreshToken) {
      tokenStorage.clear()
      return Promise.reject(error)
    }

    config._retried = true

    try {
      // Reuse a single in-flight refresh if multiple requests 401 at once.
      refreshPromise =
        refreshPromise ||
        axios
          .post(`${BASE_URL}/accounts/token/refresh/`, { refresh: refreshToken })
          .finally(() => {
            refreshPromise = null
          })

      const { data } = await refreshPromise
      tokenStorage.setTokens(data.access, refreshToken)
      config.headers.Authorization = `Bearer ${data.access}`
      return apiClient(config)
    } catch (refreshError) {
      tokenStorage.clear()
      return Promise.reject(refreshError)
    }
  }
)

export default apiClient
