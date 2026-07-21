// lib/googleTagManager.js
// Google Tag Manager container loader. Same env-gated pattern as
// googleAnalytics.js — no script loads, and no network request fires,
// unless VITE_GTM_ID is set. Local dev with a blank ID stays silent.
//
// Deliberately script-only (no <noscript> iframe fallback in index.html):
// GTM's noscript fallback exists for visitors with JavaScript disabled, but
// this entire app is a client-rendered React SPA — a no-JS visitor sees a
// blank page regardless, so the fallback iframe would never have anything
// to measure. If GTM is ever needed for a non-JS-dependent entry point
// (e.g. a future server-rendered landing page), add the fallback there.
//
// GTM vs. the existing direct GA4 integration (lib/googleAnalytics.js):
// GA4 is wired in directly via gtag.js because that's the simplest path for
// a single, known tag. GTM is for teams who need to add/change *other*
// third-party tags (ads pixels, heatmaps, etc.) without a code deploy each
// time. Enable both, either, or neither via env vars — they don't conflict.

const GTM_ID = import.meta.env.VITE_GTM_ID

let initialized = false

/**
 * Injects the GTM container script. No-ops if VITE_GTM_ID isn't set, or if
 * already initialized. Safe to call multiple times.
 */
export function initGTM() {
  if (initialized || !GTM_ID) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  initialized = true
}
