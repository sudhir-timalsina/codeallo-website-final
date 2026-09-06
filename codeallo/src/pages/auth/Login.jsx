import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import FormField from '../../components/ui/FormField.jsx'
import Button from '../../components/ui/Button.jsx'
import Logo from '../../components/layout/Logo.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(form.email, form.password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <>
      <Seo title="Log In" path="/login" />
      <div className="content-wrap flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <h1 className="text-center font-display text-2xl text-ink">Log in to your account</h1>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <FormField label="Email" name="email" type="email" required autoComplete="email"
              value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <FormField label="Password" name="password" type="password" required autoComplete="current-password"
              value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
            {error && <p role="alert" className="text-sm text-error">{error}</p>}
            <Button type="submit" disabled={loading} className="mt-1">
              {loading ? 'Logging in…' : 'Log In'}
            </Button>
          </form>
          <div className="mt-6 flex justify-between text-sm text-graphite">
            <Link to="/forgot-password" className="hover:text-ink">Forgot password?</Link>
            <Link to="/register" className="hover:text-ink">Create an account</Link>
          </div>
        </div>
      </div>
    </>
  )
}
