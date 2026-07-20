// lib/googleAnalytics.js
// GA4 integration. Loads gtag.js dynamically (not hardcoded in index.html)
// so local dev without a configured Measurement ID never fires GA calls or
// console warnings. Set VITE_GA_MEASUREMENT_ID to enable.

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let initialized = false

/**
 * Injects the gtag.js script and initializes GA4. No-ops if no Measurement
 * ID is configured (e.g. local development). Safe to call multiple times —
 * only initializes once.
 */
export function initGA() {
  if (initialized || !MEASUREMENT_ID) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  // send_page_view disabled — page views are sent manually per route change
  // (see trackPageview below) since this is an SPA, not a full page reload.
  gtag('config', MEASUREMENT_ID, { send_page_view: false })

  initialized = true
}

/**
 * Sends a GA4 page_view event for the given path. Call this on every route
 * change (see useGoogleAnalyticsPageviews in hooks/index.js).
 */
export function trackPageview(path, title) {
  if (!initialized || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  })
}

/**
 * Sends a custom GA4 event. Used alongside the internal BusinessEvent
 * logging (lib/api/analytics.js) so conversions show up in both the
 * internal dashboard and Google Analytics (Phase 7.2 — Business
 * Intelligence pairs the two).
 */
export function trackEvent(eventName, params = {}) {
  if (!initialized || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}
