{/*DashboardOverviewPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useApi } from '../../hooks'
import { getContactEnquiries } from '../../lib/api/contacts'
import { getQuotationRequests } from '../../lib/api/quotations'
import { getJobApplications } from '../../lib/api/careers'
import { getNewsletterSubscribers } from '../../lib/api/newsletter'

function StatCard({ label, value, loading }) {
  return (
    <div className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-5 rounded-sm">
      <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-2">{label}</p>
      <p className="text-3xl font-display text-white">{loading ? '—' : value ?? 0}</p>
    </div>
  )
}

export default function DashboardOverviewPage() {
  const { data: enquiries, loading: l1, run: runEnquiries } = useApi(getContactEnquiries)
  const { data: quotations, loading: l2, run: runQuotations } = useApi(getQuotationRequests)
  const { data: applications, loading: l3, run: runApplications } = useApi(getJobApplications)
  const { data: subscribers, loading: l4, run: runSubscribers } = useApi(getNewsletterSubscribers)

  useEffect(() => {
    runEnquiries({ status: 'new' })
    runQuotations({ status: 'new' })
    runApplications({ status: 'submitted' })
    runSubscribers({ is_active: true })
  }, [runEnquiries, runQuotations, runApplications, runSubscribers])

  const count = (data) => data?.count ?? (Array.isArray(data?.results) ? data.results.length : Array.isArray(data) ? data.length : 0)

  return (
    <>
      <Helmet>
        <title>Dashboard — Vayuron Advanced Systems</title>
      </Helmet>

      <DashboardLayout title="Overview">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="New Enquiries" value={count(enquiries)} loading={l1} />
          <StatCard label="New Quotations" value={count(quotations)} loading={l2} />
          <StatCard label="Pending Applications" value={count(applications)} loading={l3} />
          <StatCard label="Active Subscribers" value={count(subscribers)} loading={l4} />
        </div>

        <p className="text-sm text-[var(--muted)] mt-8">
          Use the sidebar to manage enquiries, quotations, career applications,
          blog content, and newsletter campaigns.
        </p>
      </DashboardLayout>
    </>
  )
}
