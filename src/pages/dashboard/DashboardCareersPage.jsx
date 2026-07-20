{/*DashboardCareersPage.jsx*/ }

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatusBadge from '../../components/dashboard/StatusBadge'
import { useApi } from '../../hooks'
import { getJobApplications, updateJobApplication } from '../../lib/api/careers'
import { exportToCsv } from '../../utils/exportCsv'

const STATUS_OPTIONS = ['submitted', 'under_review', 'shortlisted', 'rejected', 'hired']

export default function DashboardCareersPage() {
  const { data, loading, error, run: fetchApplications } = useApi(getJobApplications)
  const { run: updateApplication } = useApi(updateJobApplication)
  const [updatingId, setUpdatingId] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [exporting, setExporting] = useState(false)
  const [notesDraft, setNotesDraft] = useState({})

  const runQuery = () => {
    const params = {}
    if (search) params.search = search
    if (statusFilter) params.status = statusFilter
    fetchApplications(params)
  }

  useEffect(() => {
    runQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const applications = data?.results || data || []

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      await updateApplication(id, { status })
      runQuery()
    } finally {
      setUpdatingId(null)
    }
  }

  const handleNotesSave = async (id) => {
    const internal_notes = notesDraft[id]
    if (internal_notes === undefined) return
    setUpdatingId(id)
    try {
      await updateApplication(id, { internal_notes })
      runQuery()
    } finally {
      setUpdatingId(null)
    }
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      const params = { page_size: 1000 }
      if (search) params.search = search
      if (statusFilter) params.status = statusFilter
      const full = await getJobApplications(params)
      const rows = full?.results || full || []
      exportToCsv(
        rows,
        [
          { key: 'full_name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone_number', label: 'Phone' },
          { key: 'education', label: 'Education' },
          { key: 'experience', label: 'Experience' },
          { key: 'skills', label: 'Skills' },
          { key: 'status', label: 'Status' },
          { key: 'resume', label: 'Resume URL' },
          { key: 'created_at', label: 'Submitted' },
        ],
        `job-applications-${new Date().toISOString().slice(0, 10)}.csv`
      )
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Careers — Dashboard</title>
      </Helmet>

      <DashboardLayout title="Job Applications">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runQuery()}
            className="flex-1 min-w-[200px] bg-black/60 border border-cyan/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/60 border border-cyan/20 text-white text-sm px-3 py-2 focus:outline-none focus:border-cyan"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
          <button
            onClick={runQuery}
            className="border border-cyan/40 text-cyan px-4 py-2 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
          >
            Search
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="border border-white/20 text-white/100 px-4 py-2 text-xs uppercase tracking-widest hover:border-cyan hover:text-cyan transition-all disabled:opacity-50"
          >
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        </div>

        {loading && <p className="text-sm text-[var(--muted)]">Loading…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {!loading && applications.length === 0 && (
          <p className="text-sm text-[var(--muted)]">No applications found.</p>
        )}

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-4 rounded-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-[240px]">
                  <p className="text-white font-medium">{app.full_name}</p>
                  <p className="text-xs text-[var(--muted)]">{app.email}</p>
                  {app.skills && (
                    <p className="text-sm text-cyan mt-2">{app.skills}</p>
                  )}
                  <div className="flex gap-3 mt-2">
                    {app.resume && (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan hover:underline"
                      >
                        Download Resume ↗
                      </a>
                    )}
                    {app.certificate && (
                      <a
                        href={app.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan hover:underline"
                      >
                        Download Certificate ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={app.status} />
                  <select
                    value={app.status}
                    disabled={updatingId === app.id}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="bg-black/60 border border-cyan/20 text-white text-xs px-2 py-1 focus:outline-none focus:border-cyan"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <label className="block text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1">
                  Internal notes
                </label>
                <div className="flex gap-2">
                  <textarea
                    rows={1}
                    placeholder="Add a note…"
                    value={notesDraft[app.id] ?? app.internal_notes ?? ''}
                    onChange={(e) =>
                      setNotesDraft((prev) => ({ ...prev, [app.id]: e.target.value }))
                    }
                    className="flex-1 bg-black/60 border border-cyan/20 text-white text-xs px-2 py-1.5 focus:outline-none focus:border-cyan resize-none"
                  />
                  <button
                    onClick={() => handleNotesSave(app.id)}
                    disabled={updatingId === app.id}
                    className="border border-white/20 text-white/70 px-2 text-xs hover:border-cyan hover:text-cyan transition-all"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  )
}
