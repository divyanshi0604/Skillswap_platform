import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Helmet } from "react-helmet";

const initialFormData = {
  email: '',
  password: '',
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const validationErrors = {}

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.'
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required.'
    }

    return validationErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setAlert({ type: 'error', message: 'Please provide your login details.' })
      return
    }

    try {
      setIsLoading(true)
      setAlert({ type: '', message: '' })

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      })

      let payload = null
      try {
        payload = await response.json()
      } catch {
        payload = null
      }

      if (!response.ok) {
        const message = payload?.message || 'Login failed. Please check your credentials.'
        throw new Error(message)
      }

      const user = payload || null
      login(user)
      setAlert({ type: 'success', message: 'Login successful. Redirecting...' })
      setFormData(initialFormData)

      setTimeout(() => {
        navigate('/')
      }, 700)
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Unable to login.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:px-6 lg:px-8 flex items-center justify-center">
      <Helmet>
        <title>Login - SkillSwap</title>
        <meta name="description" content="Log in to your SkillSwap account" />
      </Helmet>
      
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.25),transparent_50%)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-60 w-60 -translate-x-1/3 -translate-y-1/3 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.7)] backdrop-blur-xl sm:p-8">
        <p className="font-[Space_Grotesk] text-sm uppercase tracking-[0.3em] text-emerald-300">SkillSwap</p>
        <h1 className="mt-3 font-[Space_Grotesk] text-3xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-300">Log in and continue your skill exchange journey.</p>

        {alert.message && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${alert.type === 'success'
              ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
              : 'border-rose-400/40 bg-rose-500/10 text-rose-200'
              }`}
          >
            {alert.message}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <label className="block text-sm text-slate-200" htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-300"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
          </label>

          <label className="block text-sm text-slate-200" htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-300"
              placeholder="Enter your password"
            />
            {errors.password && <p className="mt-1 text-xs text-rose-300">{errors.password}</p>}
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-4 py-3 font-medium text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          New to SkillSwap?{' '}
          <Link to="/signup" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
