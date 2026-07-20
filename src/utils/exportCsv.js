// utils/exportCsv.js
// Client-side CSV export — no library needed for a simple flat-object export.
// Used by dashboard list pages (Phase 4.3) to export the currently loaded,
// filtered result set.

function escapeCsvValue(value) {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/**
 * @param {Array<Object>} rows - flat objects, one per row
 * @param {Array<{key: string, label: string}>} columns - which fields to export, in order
 * @param {string} filename
 */
export function exportToCsv(rows, columns, filename) {
  const header = columns.map((c) => escapeCsvValue(c.label)).join(',')
  const body = rows
    .map((row) => columns.map((c) => escapeCsvValue(row[c.key])).join(','))
    .join('\n')
  const csv = `${header}\n${body}`

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
