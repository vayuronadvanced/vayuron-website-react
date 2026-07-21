// lib/webVitals.js
// Core Web Vitals monitoring (LCP, INP, CLS, FCP, TTFB). Forwards each
// metric to GA4 as a custom event via the existing trackEvent() — so field
// data (real visitors, real devices/networks) shows up in Analytics
// alongside the lab data from Lighthouse, without adding a second
// monitoring vendor. If VITE_GA_MEASUREMENT_ID isn't set, trackEvent()
// itself no-ops, so this stays silent in local dev just like GA4 does.
//
// In dev, metrics are also logged to the console so they're visible without
// needing GA configured at all.

import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'
import { trackEvent } from './googleAnalytics'

function reportMetric(metric) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(`[web-vitals] ${metric.name}:`, Math.round(metric.value), metric.rating)
  }

  // GA4 custom event. `value` is rounded per Google's own recommended
  // reporting pattern (CLS is scored ×1000 since GA4 metrics must be
  // integers); `rating` ('good' | 'needs-improvement' | 'poor') lets you
  // segment without recomputing thresholds in GA.
  trackEvent('web_vitals', {
    metric_name: metric.name,
    metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    metric_id: metric.id,
  })
}

/**
 * Starts Core Web Vitals collection for the current page load. Call once,
 * high in the component tree (App.jsx). Safe to call multiple times — each
 * web-vitals listener itself only fires once per page load per metric.
 */
export function initWebVitals() {
  onCLS(reportMetric)
  onINP(reportMetric)
  onLCP(reportMetric)
  onFCP(reportMetric)
  onTTFB(reportMetric)
}
