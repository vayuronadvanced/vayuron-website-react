{/*DashboardQuotationsPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatusBadge from '../../components/dashboard/StatusBadge'
import { useApi } from '../../hooks'
import { getQuotationRequests, updateQuotationRequest } from '../../lib/api/quotations'
import { getUsers } from '../../lib/api/accounts'
import { exportToCsv } from '../../utils/exportCsv'

const STATUS_OPTIONS = ['new', 'reviewed', 'quoted', 'closed']

export default function DashboardQuotationsPage() {
  const { data, loading, error, run: fetchQuotations } = useApi(getQuotationRequests)
  const { run: updateQuotation } = useApi(updateQuotationRequest)
  const { data: staffData, run: fetchStaff } = useApi(getUsers)
  const [updatingId, setUpdatingId] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [exporting, setExporting] = useState(false)
  const [notesDraft, setNotesDraft] = useState({})
  const [amountDraft, setAmountDraft] = useState({})

  const staff = (staffData?.results || staffData || []).filter((u) =>
    ['admin', 'employee'].includes(u.role)
  )

  const runQuery = () => {
    const params = {}
    if (search) params.search = search
    if (statusFilter) params.status = statusFilter
    fetchQuotations(params)
  }

  useEffect(() => {
    fetchStaff()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    runQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const quotations = data?.results || data || []

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      await updateQuotation(id, { status })
      runQuery()
    } finally {
      setUpdatingId(null)
    }
  }

  const handleAssign = async (id, assigned_to) => {
    setUpdatingId(id)
    try {
      await updateQuotation(id, { assigned_to: assigned_to || null })
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
      await updateQuotation(id, { internal_notes })
      runQuery()
    } finally {
      setUpdatingId(null)
    }
  }

  const handleAmountSave = async (id) => {
    const quoted_amount = amountDraft[id]
    if (quoted_amount === undefined || quoted_amount === '') return
    setUpdatingId(id)
    try {
      await updateQuotation(id, { quoted_amount })
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
      const full = await getQuotationRequests(params)
      const rows = full?.results || full || []
      exportToCsv(
        rows,
        [
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone_number', label: 'Phone' },
          { key: 'company', label: 'Company' },
          { key: 'product_or_sector', label: 'Product/Sector' },
          { key: 'requirements', label: 'Requirements' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'quoted_amount', label: 'Quoted Amount' },
          { key: 'status', label: 'Status' },
          { key: 'created_at', label: 'Submitted' },
        ],
        `quotation-requests-${new Date().toISOString().slice(0, 10)}.csv`
      )
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Quotations — Dashboard</title>
      </Helmet>

      <DashboardLayout title="Quotation Requests">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search name, email, company, product/sector…"
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
            className="border border-white/20 text-white/70 px-4 py-2 text-xs uppercase tracking-widest hover:border-cyan hover:text-cyan transition-all disabled:opacity-50"
          >
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        </div>

        {loading && <p className="text-sm text-[var(--muted)]">Loading…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {!loading && quotations.length === 0 && (
          <p className="text-sm text-[var(--muted)]">No quotation requests found.</p>
        )}

        <div className="space-y-3">
          {quotations.map((q) => (
            <div
              key={q.id}
              className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-4 rounded-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-[240px]">
                  <p className="text-white font-medium">{q.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {q.email} {q.company && `· ${q.company}`}
                  </p>
                  {q.product_or_sector && (
                    <p className="text-sm text-cyan mt-2">{q.product_or_sector}</p>
                  )}
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
                    {q.requirements}
                  </p>
                  {q.quantity && (
                    <p className="text-xs text-white/60 mt-1">Quantity: {q.quantity}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={q.status} />
                  <select
                    value={q.status}
                    disabled={updatingId === q.id}
                    onChange={(e) => handleStatusChange(q.id, e.target.value)}
                    className="bg-black/60 border border-cyan/20 text-white text-xs px-2 py-1 focus:outline-none focus:border-cyan"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1">
                    Assigned to
                  </label>
                  <select
                    value={q.assigned_to || ''}
                    disabled={updatingId === q.id}
                    onChange={(e) => handleAssign(q.id, e.target.value)}
                    className="w-full bg-black/60 border border-cyan/20 text-white text-xs px-2 py-1.5 focus:outline-none focus:border-cyan"
                  >
                    <option value="">Unassigned</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>{s.username} ({s.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1">
                    Quoted amount (₹)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={q.quoted_amount || '0.00'}
                      value={amountDraft[q.id] ?? ''}
                      onChange={(e) =>
                        setAmountDraft((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      className="flex-1 w-full bg-black/60 border border-cyan/20 text-white text-xs px-2 py-1.5 focus:outline-none focus:border-cyan"
                    />
                    <button
                      onClick={() => handleAmountSave(q.id)}
                      disabled={updatingId === q.id}
                      className="border border-white/20 text-white/70 px-2 text-xs hover:border-cyan hover:text-cyan transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1">
                    Internal notes
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      rows={1}
                      placeholder="Add a note…"
                      value={notesDraft[q.id] ?? q.internal_notes ?? ''}
                      onChange={(e) =>
                        setNotesDraft((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      className="flex-1 bg-black/60 border border-cyan/20 text-white text-xs px-2 py-1.5 focus:outline-none focus:border-cyan resize-none"
                    />
                    <button
                      onClick={() => handleNotesSave(q.id)}
                      disabled={updatingId === q.id}
                      className="border border-white/20 text-white/70 px-2 text-xs hover:border-cyan hover:text-cyan transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  )
}
