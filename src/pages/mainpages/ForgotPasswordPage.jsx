{/*ForgotPasswordPage.jsx*/ }

import Seo from '../../components/seo/Seo'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../../lib/api/accounts'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await requestPasswordReset(email)
      setSent(true)
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        'Something went wrong. Please try again in a moment.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo title="Forgot Password" description="Reset your Vayuron Advanced Systems account password." path="/forgot-password" noindex />

      <main className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="w-full max-w-md border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-8 rounded-sm">
          <h1 className="font-display text-2xl font-bold text-white mb-1">Forgot Password</h1>
          <p className="text-sm text-[var(--muted)] mb-6">
            Enter your account email and we&apos;ll send you a reset link.
          </p>

          {sent ? (
            <p className="text-sm text-cyan leading-relaxed">
              If an account exists for that email, a reset link is on its way. Check your
              inbox (and spam folder) for further instructions.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
              />

              {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending…' : 'Send Reset Link →'}
              </button>
            </form>
          )}

          <p className="text-sm text-[var(--muted)] mt-6 text-center">
            Remembered your password?{' '}
            <Link to="/login" className="text-cyan hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
