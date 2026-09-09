import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, BookOpen } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { getCourseBySlug } from '../data/courses.js'
import { getLearnCourseBySlug } from '../data/learnCourses.js'

export default function Dashboard() {
  const { user, profile, signOut } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [certificates, setCertificates] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function loadData() {
      const [enrollmentsRes, certificatesRes, progressRes] = await Promise.all([
        supabase
          .from('enrollments')
          .select('id, status, created_at, course_slug')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('certificates')
          .select('*')
          .eq('user_id', user.id)
          .order('issued_at', { ascending: false }),
        supabase
          .from('lesson_progress')
          .select('course_slug, lesson_slug')
          .eq('user_id', user.id),
      ])

      if (mounted) {
        const certifiedSlugs = new Set((certificatesRes.data || []).map((c) => c.course_slug))

        // Group progress rows by course, then keep only courses that are
        // partially (not fully) read and don't already have a certificate.
        const byCourse = {}
        for (const row of progressRes.data || []) {
          byCourse[row.course_slug] = (byCourse[row.course_slug] || 0) + 1
        }
        const inProgressCourses = Object.entries(byCourse)
          .map(([slug, count]) => {
            const course = getLearnCourseBySlug(slug)
            if (!course) return null
            return { slug, title: course.title, completed: count, total: course.lessons.length }
          })
          .filter(
            (c) => c && !certifiedSlugs.has(c.slug) && c.completed > 0 && c.completed < c.total
          )

        setEnrollments(enrollmentsRes.data || [])
        setCertificates(certificatesRes.data || [])
        setInProgress(inProgressCourses)
        setLoading(false)
      }
    }
    if (user) loadData()
    return () => {
      mounted = false
    }
  }, [user])

  return (
    <>
      <Seo title="Your Dashboard" path="/dashboard" />
      <div className="content-wrap py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
          <div>
            <p className="text-sm text-ash">Dashboard</p>
            <h1 className="mt-1 font-display text-3xl text-ink">
              {profile?.full_name ? `Welcome, ${profile.full_name}` : 'Your Dashboard'}
            </h1>
          </div>
          <button onClick={signOut} className="text-sm text-graphite underline underline-offset-4 hover:text-ink">
            Sign out
          </button>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            {!loading && inProgress.length > 0 && (
              <div>
                <h2 className="font-display text-xl text-ink">Continue learning</h2>
                <ul className="mt-5 space-y-4">
                  {inProgress.map((c) => {
                    const percent = Math.round((c.completed / c.total) * 100)
                    return (
                      <li key={c.slug} className="border border-line p-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-2 text-graphite">
                            <BookOpen size={15} className="text-ash" />
                            {c.title}
                          </span>
                          <Link
                            to={`/learn/${c.slug}`}
                            className="shrink-0 text-sm text-ink underline underline-offset-4"
                          >
                            Continue
                          </Link>
                        </div>
                        <div className="mt-3 h-1.5 w-full bg-bone">
                          <div className="h-1.5 bg-ink" style={{ width: `${percent}%` }} />
                        </div>
                        <p className="mt-1.5 text-xs text-ash">
                          {c.completed} of {c.total} lessons &middot; {percent}%
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div>
              <h2 className="font-display text-xl text-ink">Your certificates</h2>
              <div className="mt-5">
                {loading ? (
                  <LoadingState label="Loading your certificates" />
                ) : certificates.length === 0 ? (
                  <EmptyState
                    title="No certificates yet"
                    description="Pass a free course quiz to earn your first Codeallo certificate."
                    action={<Button to="/courses" variant="secondary" size="sm">Browse Free Courses</Button>}
                  />
                ) : (
                  <ul className="divide-y divide-line border-t border-line">
                    {certificates.map((cert) => (
                      <li key={cert.id} className="flex items-center justify-between gap-4 py-4">
                        <span className="flex items-center gap-2 text-graphite">
                          <Award size={15} className="text-ash" />
                          {cert.course_title}
                        </span>
                        <Link
                          to={`/certificate/${cert.id}`}
                          className="text-sm text-ink underline underline-offset-4"
                        >
                          View / Print
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl text-ink">Your course enrollments</h2>
              <div className="mt-5">
                {loading ? (
                  <LoadingState label="Loading your courses" />
                ) : enrollments.length === 0 ? (
                  <EmptyState
                    title="No enrollments yet"
                    description="Once you register interest in a paid or upcoming course, it will show up here."
                    action={<Button to="/courses" variant="secondary" size="sm">Browse Courses</Button>}
                  />
                ) : (
                  <ul className="divide-y divide-line border-t border-line">
                    {enrollments.map((e) => (
                      <li key={e.id} className="flex items-center justify-between gap-4 py-4">
                        <span className="text-graphite">{getCourseBySlug(e.course_slug)?.title || e.course_slug}</span>
                        <span className="text-xs uppercase tracking-wide text-ash">{e.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <h2 className="font-display text-xl text-ink">Account</h2>
            <dl className="mt-5 space-y-4 border-t border-line pt-5 text-sm">
              <div>
                <dt className="text-ash">Email</dt>
                <dd className="mt-0.5 text-graphite">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-ash">Full name</dt>
                <dd className="mt-0.5 text-graphite">{profile?.full_name || '—'}</dd>
              </div>
              <div>
                <dt className="text-ash">Role</dt>
                <dd className="mt-0.5 capitalize text-graphite">{profile?.role || 'student'}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </>
  )
}
