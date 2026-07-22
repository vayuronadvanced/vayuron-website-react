{/*VerifyEmailPage.jsx*/ }

import Seo from '../../components/seo/Seo'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { confirmEmailVerification, resendVerificationEmail } from '../../lib/api/accounts'

export default function VerifyEmailPage() {
  const { uid, token } = useParams()
  const [status, setStatus] = useState('verifying') // verifying | success | error
  const [resendEmail, setResendEmail] = useState('')
  const [resendSent, setResendSent] = useState(false)

  useEffect(() => {
    let cancelled = false
    confirmEmailVerification({ uid, token })
      .then(() => {
        if (!cancelled) setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [uid, token])

  const handleResend = async (e) => {
    e.preventDefault()
    await resendVerificationEmail(resendEmail)
    setResendSent(true)
  }

  return (
    <>
      <Seo title="Verify Email" description="Verify your Vayuron Advanced Systems account email address." path="/verify-email" noindex />

      <main className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="w-full max-w-md border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-8 rounded-sm text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-1">Email Verification</h1>

          {status === 'verifying' && (
            <p className="text-sm text-[var(--muted)] mt-4">Verifying your email…</p>
          )}

          {status === 'success' && (
            <>
              <p className="text-sm text-cyan mt-4 leading-relaxed">
                Your email has been verified. You can now sign in to your account.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full mt-6 border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all"
              >
                Sign In →
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <p className="text-sm text-red-400 mt-4 leading-relaxed">
                This verification link is invalid or has expired. Enter your email below to
                get a new one.
              </p>
              {resendSent ? (
                <p className="text-sm text-cyan mt-4">
                  If an unverified account exists for that email, a new link has been sent.
                </p>
              ) : (
                <form onSubmit={handleResend} className="space-y-3 mt-4 text-left">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all"
                  >
                    Resend Verification Email →
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}
