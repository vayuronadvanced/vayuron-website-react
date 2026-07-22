{/*ResetPasswordPage.jsx*/ }

import Seo from '../../components/seo/Seo'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { confirmPasswordReset } from '../../lib/api/accounts'

export default function ResetPasswordPage() {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ new_password: '', confirm_password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (form.new_password !== form.confirm_password) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await confirmPasswordReset({ uid, token, new_password: form.new_password })
      setDone(true)
      setTimeout(() => navigate('/login', { replace: true }), 2500)
    } catch (err) {
      setError(
        err?.response?.data?.token?.[0] ||
        err?.response?.data?.new_password?.[0] ||
        err?.response?.data?.detail ||
        'This reset link is invalid or has expired. Please request a new one.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo title="Reset Password" description="Set a new password for your Vayuron Advanced Systems account." path="/reset-password" noindex />

      <main className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="w-full max-w-md border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-8 rounded-sm">
          <h1 className="font-display text-2xl font-bold text-white mb-1">Reset Password</h1>
          <p className="text-sm text-[var(--muted)] mb-6">
            Choose a new password for your account.
          </p>

          {done ? (
            <p className="text-sm text-cyan leading-relaxed">
              Password updated. Redirecting you to sign in…
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="password"
                name="new_password"
                required
                placeholder="New password"
                value={form.new_password}
                onChange={handleChange}
                className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
              />
              <input
                type="password"
                name="confirm_password"
                required
                placeholder="Confirm new password"
                value={form.confirm_password}
                onChange={handleChange}
                className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
              />

              {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating…' : 'Reset Password →'}
              </button>
            </form>
          )}

          <p className="text-sm text-[var(--muted)] mt-6 text-center">
            <Link to="/login" className="text-cyan hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
