{/*LoginPage.jsx*/ }

import Seo from '../../components/seo/Seo'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const redirectTo = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        'Invalid username or password. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo title="Login" description="Sign in to your Vayuron Advanced Systems account." path="/login" noindex />

      <main className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="w-full max-w-md border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-8 rounded-sm">
          <h1 className="font-display text-2xl font-bold text-white mb-1">Sign In</h1>
          <p className="text-sm text-[var(--muted)] mb-6">
            Access your Vayuron account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />

            {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p className="text-sm text-[var(--muted)] mt-6 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-cyan hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
