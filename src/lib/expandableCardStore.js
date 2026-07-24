// expandableCardStore.js
//
// Minimal pub/sub so InfoCard's mobile tap-to-expand can enforce "only one
// card expanded at a time" across the whole site (all grids, all pages)
// without needing a React Context Provider wired into App.jsx — which would
// mean touching the shared render tree just for a mobile-only interaction.
// Plain module-level state is fine here: it's read via useSyncExternalStore
// so React stays the source of truth for re-renders, it resets naturally on
// a full page navigation/reload, and it has zero effect on desktop, where
// InfoCard never subscribes to it at all.

let expandedId = null
const listeners = new Set()

export function getExpandedCardId() {
  return expandedId
}

export function setExpandedCardId(id) {
  expandedId = id
  listeners.forEach((l) => l())
}

export function toggleExpandedCardId(id) {
  setExpandedCardId(expandedId === id ? null : id)
}

export function subscribeExpandedCard(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
