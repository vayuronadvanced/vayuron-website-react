{/*DashboardNewsletterPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatusBadge from '../../components/dashboard/StatusBadge'
import { useApi } from '../../hooks'
import {
  createNewsletterCampaign,
  getNewsletterCampaigns,
  getNewsletterSubscribers,
  sendNewsletterCampaign,
} from '../../lib/api/newsletter'
import { exportToCsv } from '../../utils/exportCsv'

export default function DashboardNewsletterPage() {
  const { data: subsData, loading: subsLoading, run: fetchSubscribers } = useApi(getNewsletterSubscribers)
  const { data: campaignsData, loading, error, run: fetchCampaigns } = useApi(getNewsletterCampaigns)
  const { run: create } = useApi(createNewsletterCampaign)
  const { run: send } = useApi(sendNewsletterCampaign)
  const [form, setForm] = useState({ subject: '', body: '' })
  const [subSearch, setSubSearch] = useState('')
  const [exporting, setExporting] = useState(false)

  const runSubscriberQuery = () => {
    const params = { is_active: true }
    if (subSearch) params.search = subSearch
    fetchSubscribers(params)
  }

  useEffect(() => {
    runSubscriberQuery()
    fetchCampaigns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subscriberCount = subsData?.count ?? (subsData?.results || subsData || []).length
  const campaigns = campaignsData?.results || campaignsData || []

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.subject || !form.body) return
    await create(form)
    setForm({ subject: '', body: '' })
    fetchCampaigns()
  }

  const handleSend = async (id) => {
    if (!window.confirm(`Send this campaign to ${subscriberCount} active subscribers?`)) return
    await send(id)
    fetchCampaigns()
  }

  const handleExportSubscribers = async () => {
    setExporting(true)
    try {
      const params = { is_active: true, page_size: 1000 }
      if (subSearch) params.search = subSearch
      const full = await getNewsletterSubscribers(params)
      const rows = full?.results || full || []
      exportToCsv(
        rows,
        [
          { key: 'email', label: 'Email' },
          { key: 'created_at', label: 'Subscribed' },
        ],
        `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
      )
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Newsletter — Dashboard</title>
      </Helmet>

      <DashboardLayout title="Newsletter">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <p className="text-sm text-[var(--muted)]">
            {subsLoading ? 'Loading…' : `${subscriberCount} active subscriber${subscriberCount === 1 ? '' : 's'}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <input
            type="text"
            placeholder="Search subscriber email…"
            value={subSearch}
            onChange={(e) => setSubSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runSubscriberQuery()}
            className="flex-1 min-w-[200px] bg-black/60 border border-cyan/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
          />
          <button
            onClick={runSubscriberQuery}
            className="border border-cyan/40 text-cyan px-4 py-2 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
          >
            Search
          </button>
          <button
            onClick={handleExportSubscribers}
            disabled={exporting}
            className="border border-white/20 text-white/70 px-4 py-2 text-xs uppercase tracking-widest hover:border-cyan hover:text-cyan transition-all disabled:opacity-50"
          >
            {exporting ? 'Exporting…' : 'Export Subscribers CSV'}
          </button>
        </div>

        <div className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-5 rounded-sm mb-8">
          <h2 className="text-white font-medium mb-3">New Campaign</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />
            <textarea
              placeholder="Body"
              rows={4}
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
            />
            <button
              type="submit"
              className="border border-cyan text-cyan px-5 py-2 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
            >
              Save Draft
            </button>
          </form>
        </div>

        <h2 className="text-white font-medium mb-3">Campaigns</h2>
        {loading && <p className="text-sm text-[var(--muted)]">Loading…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        {!loading && campaigns.length === 0 && (
          <p className="text-sm text-[var(--muted)]">No campaigns yet.</p>
        )}

        <div className="space-y-3">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-4 rounded-sm flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="text-white font-medium">{c.subject}</p>
                {c.status === 'sent' && (
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Sent to {c.recipient_count} recipients
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={c.status} />
                {c.status !== 'sent' && (
                  <button
                    onClick={() => handleSend(c.id)}
                    className="border border-cyan text-cyan px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  )
}
