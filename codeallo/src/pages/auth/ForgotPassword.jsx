import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import FormField from '../../components/ui/FormField.jsx'
import Button from '../../components/ui/Button.jsx'
import Logo from '../../components/layout/Logo.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setSent(true)
  }

  return (
    <>
      <Seo title="Reset Password" path="/forgot-password" />
      <div className="content-wrap flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          {sent ? (
            <div className="text-center">
              <h1 className="font-display text-2xl text-ink">Check your email</h1>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                If an account exists for {email}, a password reset link is on its way.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-center font-display text-2xl text-ink">Reset your password</h1>
              <p className="mt-2 text-center text-sm text-graphite">
                Enter your email and we&rsquo;ll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <FormField label="Email" name="email" type="email" required autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                {error && <p role="alert" className="text-sm text-error">{error}</p>}
                <Button type="submit" disabled={loading} className="mt-1">
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </Button>
              </form>
            </>
          )}
          <p className="mt-6 text-center text-sm text-graphite">
            <Link to="/login" className="text-ink underline underline-offset-4">Back to login</Link>
          </p>
        </div>
      </div>
    </>
  )
}
