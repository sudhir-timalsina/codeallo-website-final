import { useEffect, useState } from 'react'
import EmptyState from '../ui/EmptyState.jsx'
import LoadingState from '../ui/LoadingState.jsx'
import Button from '../ui/Button.jsx'
import { supabase } from '../../lib/supabaseClient.js'

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'approved')
      .then(({ data, error }) => {
        if (!mounted) return
        if (!error) setTestimonials(data || [])
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="content-wrap py-24 sm:py-32">
      <div className="max-w-xl">
        <p className="mb-3 text-sm text-ash">In their words</p>
        <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">What clients and students say</h2>
      </div>

      <div className="mt-12">
        {loading ? (
          <LoadingState label="Loading testimonials" />
        ) : testimonials.length === 0 ? (
          <EmptyState
            title="We're collecting our first testimonials"
            description="We'd rather show real feedback from real clients and students than none at all. Check back soon, or ask us directly for references from current projects."
            action={
              <Button to="/contact" variant="secondary" size="sm">
                Ask for references
              </Button>
            }
          />
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2">
            {testimonials.map((t) => (
              <li key={t.id} className="border-t border-line pt-6">
                <p className="text-base leading-relaxed text-graphite">&ldquo;{t.testimonial}&rdquo;</p>
                <p className="mt-4 text-sm text-ink">{t.name}</p>
                <p className="text-xs text-ash">
                  {t.role}{t.role && t.organization ? ', ' : ''}{t.organization}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
