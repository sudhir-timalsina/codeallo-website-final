import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import FormField from '../../components/ui/FormField.jsx'
import Button from '../../components/ui/Button.jsx'
import Logo from '../../components/layout/Logo.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function Register() {
  const { signUp } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signUp(form.email, form.password, form.fullName)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <>
        <Seo title="Check Your Email" path="/register" />
        <div className="content-wrap flex min-h-[70vh] items-center justify-center py-16 text-center">
          <div className="max-w-sm">
            <h1 className="font-display text-2xl text-ink">Check your email</h1>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              We&rsquo;ve sent a confirmation link to {form.email}. Verify your
              email to finish creating your account, then log in.
            </p>
            <Button to="/login" className="mt-6">Go to Login</Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Seo title="Create an Account" path="/register" />
      <div className="content-wrap flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <h1 className="text-center font-display text-2xl text-ink">Create your account</h1>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <FormField label="Full name" name="fullName" required autoComplete="name"
              value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} />
            <FormField label="Email" name="email" type="email" required autoComplete="email"
              value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <FormField label="Password" name="password" type="password" required minLength={6} autoComplete="new-password"
              value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
            {error && <p role="alert" className="text-sm text-error">{error}</p>}
            <Button type="submit" disabled={loading} className="mt-1">
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-graphite">
            Already have an account?{' '}
            <Link to="/login" className="text-ink underline underline-offset-4">Log in</Link>
          </p>
        </div>
      </div>
    </>
  )
}
