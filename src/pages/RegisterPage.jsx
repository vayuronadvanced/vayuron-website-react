{/*RegisterPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const initialForm = {
  username: '',
  email: '',
  password: '',
  password_confirm: '',
  first_name: '',
  last_name: '',
  phone_number: '',
}

export default function RegisterPage() {
  const { register, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(form)
      // Registration succeeded — sign the new account in immediately.
      await login({ username: form.username, password: form.password })
      navigate('/', { replace: true })
    } catch (err) {
      const data = err?.response?.data
      const message =
        data && typeof data === 'object'
          ? Object.values(data).flat().join(' ')
          : 'Registration failed. Please check your details and try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Create Account — Vayuron Advanced Systems</title>
      </Helmet>

      <main className="min-h-screen flex items-center justify-center bg-black px-6 py-16">
        <div className="w-full max-w-md border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm p-8 rounded-sm">
          <h1 className="font-display text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-sm text-[var(--muted)] mb-6">
            Customer accounts only — Admin and Employee accounts are provisioned internally.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="username"
              required
              placeholder="Username *"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email address *"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
              />
            </div>
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone"
              value={form.phone_number}
              onChange={handleChange}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />
            <input
              type="password"
              name="password_confirm"
              required
              placeholder="Confirm password *"
              value={form.password_confirm}
              onChange={handleChange}
              className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan"
            />

            {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center w-full border border-cyan text-cyan px-7 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>

          <p className="text-sm text-[var(--muted)] mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
