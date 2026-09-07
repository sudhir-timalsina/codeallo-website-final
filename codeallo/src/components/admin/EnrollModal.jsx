import { useEffect, useState } from 'react'
import Modal from '../ui/Modal.jsx'
import FormField from '../ui/FormField.jsx'
import Button from '../ui/Button.jsx'
import { supabase } from '../../lib/supabaseClient.js'
import { courses } from '../../data/courses.js'

// Reused by both /admin/leads ("Enroll" on a specific lead, email
// pre-filled) and /admin/enrollments ("Add Enrollment", blank email).
// The person being enrolled must already have a registered account —
// enrollments are tied to a real profiles.id, so there's nothing to
// attach the enrollment to otherwise.
export default function EnrollModal({ open, onClose, prefillEmail = '', onEnrolled }) {
  const [email, setEmail] = useState(prefillEmail)
  const [courseSlug, setCourseSlug] = useState(courses[0]?.slug ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setEmail(prefillEmail)
      setError('')
    }
  }, [open, prefillEmail])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data: profile, error: lookupError } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('email', email.trim())
      .maybeSingle()

    if (lookupError) {
      setLoading(false)
      setError('Something went wrong looking up that account. Please try again.')
      return
    }

    if (!profile) {
      setLoading(false)
      setError('No account found for this email. They need to register at /register first — then you can enroll them.')
      return
    }

    const { error: insertError } = await supabase.from('enrollments').insert({
      user_id: profile.id,
      course_slug: courseSlug,
      status: 'confirmed',
    })

    setLoading(false)

    if (insertError) {
      if (insertError.code === '23505') {
        setError('This person is already enrolled in that course.')
      } else {
        setError(insertError.message)
      }
      return
    }

    onEnrolled?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Enroll a Student">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Student's email (must already have an account)"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          as="select"
          label="Course"
          name="course"
          required
          value={courseSlug}
          onChange={(e) => setCourseSlug(e.target.value)}
        >
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title} {c.isFree ? '(Free)' : ''}
            </option>
          ))}
        </FormField>
        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading} className="mt-1">
          {loading ? 'Enrolling…' : 'Confirm Enrollment'}
        </Button>
      </form>
    </Modal>
  )
}
