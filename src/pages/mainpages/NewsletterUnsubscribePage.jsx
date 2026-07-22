{/*NewsletterUnsubscribePage.jsx*/ }

import Seo from '../../components/seo/Seo'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApi } from '../../hooks'
import apiClient from '../../lib/apiClient'

async function unsubscribe(token) {
  const { data } = await apiClient.post(`/newsletter/unsubscribe/${token}/`)
  return data
}

export default function NewsletterUnsubscribePage() {
  const { token } = useParams()
  const { loading, error, run } = useApi(unsubscribe)

  useEffect(() => {
    run(token)
  }, [run, token])

  return (
    <>
      <Seo title="Unsubscribe" description="Manage your Vayuron Advanced Systems newsletter subscription." path="/newsletter/unsubscribe" noindex />

      <main className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="w-full max-w-md border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-8 rounded-sm text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Newsletter Unsubscribe
          </h1>

          {loading && <p className="text-sm text-[var(--muted)]">Processing your request…</p>}

          {!loading && !error && (
            <p className="text-sm text-[var(--muted)]">
              You&apos;ve been unsubscribed and won&apos;t receive further
              newsletter emails from us. You can resubscribe any time from
              the site footer.
            </p>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Link
            to="/"
            className="inline-block mt-6 border border-cyan text-cyan px-6 py-2 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all"
          >
            Return Home
          </Link>
        </div>
      </main>
    </>
  )
}
