import { useState } from 'react'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import FormField from '../components/ui/FormField.jsx'
import Button from '../components/ui/Button.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { siteConfig } from '../lib/siteConfig.js'
import { services } from '../data/services.js'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
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
      organization: form.organization || null,
      service: form.service || null,
      message: form.message,
    })

    if (error) {
      setStatus('error')
      setErrorMessage(
        'Something went wrong sending this. Please try again, or email us directly at ' + siteConfig.contact.email + '.'
      )
      return
    }

    setStatus('success')
    setForm({ name: '', email: '', phone: '', organization: '', service: '', message: '' })
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Codeallo for courses, school programs, or a technology project."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're working on"
        description="Whether it's a course, a school partnership or a technology project — write to us directly and we'll respond personally."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <section className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {status === 'success' ? (
            <div className="border border-line p-8">
              <h2 className="font-display text-2xl text-ink">Message sent.</h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-graphite">
                Thanks for reaching out — we read every message personally and
                will get back to you at the email you provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Full name" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
                <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" />
                <FormField label="Organization (optional)" name="organization" value={form.organization} onChange={handleChange} />
              </div>
              <FormField as="select" label="What's this about?" name="service" value={form.service} onChange={handleChange}>
                <option value="">Select an option</option>
                <option value="General enquiry">General enquiry</option>
                <option value="Course enquiry">Course enquiry</option>
                <option value="School partnership">School partnership</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </FormField>
              <FormField
                as="textarea"
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell us a bit about what you need"
              />
              {status === 'error' && (
                <p role="alert" className="text-sm text-error">
                  {errorMessage}
                </p>
              )}
              <Button type="submit" disabled={status === 'submitting'} className="self-start">
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-6">
            <h3 className="font-display text-lg text-ink">Direct contact</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-ash" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-graphite hover:text-ink">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-ash" />
                <a href={siteConfig.contact.phoneHref} className="text-graphite hover:text-ink">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={16} className="mt-0.5 shrink-0 text-ash" />
                
                  href={`${siteConfig.contact.whatsappHref}?text=${encodeURIComponent("Hi Codeallo, I'd like to ask about your courses/services.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-graphite hover:text-ink"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ash" />
                <span className="text-graphite">{siteConfig.address.full}</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}
