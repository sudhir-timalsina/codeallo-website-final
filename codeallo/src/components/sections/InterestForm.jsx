import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
import FormField from '../ui/FormField.jsx'
import Button from '../ui/Button.jsx'

export default function InterestForm({ serviceLabel, submitLabel = 'Register Interest' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      service: serviceLabel,
      message: form.message || `Interested in: ${serviceLabel}`,
    })

    if (error) {
      setStatus('error')
      setErrorMessage('Something went wrong submitting this — please try again, or email us directly.')
      return
    }

    setStatus('success')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  if (status === 'success') {
    return (
      <div className="border border-line p-6">
        <h3 className="font-display text-lg text-ink">Thanks — we&rsquo;ve got it.</h3>
        <p className="mt-2 text-sm text-graphite">
          We&rsquo;ll reach out at the email you provided as soon as there&rsquo;s an update on {serviceLabel.toLowerCase()}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-line p-6">
      <h3 className="font-display text-lg text-ink">{submitLabel}</h3>
      <FormField
        label="Full name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        autoComplete="name"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />
      <FormField
        label="Phone (optional)"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        autoComplete="tel"
      />
      <FormField
        as="textarea"
        label="Anything we should know?"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Optional"
      />
      {status === 'error' && (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      )}
      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting\u2026' : submitLabel}
      </Button>
    </form>
  )
}
