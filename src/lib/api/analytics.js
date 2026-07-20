// lib/api/analytics.js
import apiClient from '../apiClient'

// Fire-and-forget conversion event logging. Never throws into the caller —
// analytics failing silently should never block the user's actual action.
export async function logBusinessEvent(eventType, sourcePage = window.location.pathname, metadata = {}) {
  try {
    await apiClient.post('/analytics/', {
      event_type: eventType,
      source_page: sourcePage,
      metadata,
    })
  } catch {
    // Intentionally swallowed — see comment above.
  }
}
