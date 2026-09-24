import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";

const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Signup() {
  const navigate = useNavigate()
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

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required.'
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.'
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required.'
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password.'
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.'
    }

    return validationErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setAlert({ type: 'error', message: 'Please fix the highlighted fields.' })
      return
    }

    try {
      setIsLoading(true)
      setAlert({ type: '', message: '' })

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
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
        const message = payload?.message || 'Signup failed. Please try again.'
        throw new Error(message)
      }

      setAlert({ type: 'success', message: payload?.message || 'Account created successfully. Please log in.' })
      setFormData(initialFormData)
      setTimeout(() => {
        navigate('/login')
      }, 900)
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Unable to create account.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:px-6 lg:px-8  flex items-center justify-center">
      <Helmet>
        <title>Signup - SkillSwap</title>
        <meta name="description" content="Create a new SkillSwap account" />
      </Helmet>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.26),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-10 top-24 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-4 bottom-20 h-52 w-52 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.7)] backdrop-blur-xl sm:p-8">
        <p className="font-[Space_Grotesk] text-sm uppercase tracking-[0.3em] text-sky-300">SkillSwap</p>
        <h1 className="mt-3 font-[Space_Grotesk] text-3xl font-semibold text-white">Create your account</h1>
        <p className="mt-2 text-sm text-slate-300">Trade skills with real people and grow faster together.</p>

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
          <label className="block text-sm text-slate-200" htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-300"
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
          </label>

          <label className="block text-sm text-slate-200" htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-300"
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
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-300"
              placeholder="Create a secure password"
            />
            {errors.password && <p className="mt-1 text-xs text-rose-300">{errors.password}</p>}
          </label>

          <label className="block text-sm text-slate-200" htmlFor="confirmPassword">
            Confirm password
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-300"
              placeholder="Repeat your password"
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-rose-300">{errors.confirmPassword}</p>}
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-3 font-medium text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-sky-300 transition hover:text-sky-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
