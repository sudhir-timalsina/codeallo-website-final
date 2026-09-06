import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabaseClient.js'

export default function Dashboard() {
  const { user, profile, signOut } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function loadEnrollments() {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id, status, created_at, courses(title, slug)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (mounted && !error) setEnrollments(data || [])
      if (mounted) setLoading(false)
    }
    if (user) loadEnrollments()
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
          <div className="lg:col-span-8">
            <h2 className="font-display text-xl text-ink">Your courses</h2>
            <div className="mt-5">
              {loading ? (
                <LoadingState label="Loading your courses" />
              ) : enrollments.length === 0 ? (
                <EmptyState
                  title="No enrollments yet"
                  description="Once you register interest in a course, it will show up here."
                  action={<Button to="/courses" variant="secondary" size="sm">Browse Courses</Button>}
                />
              ) : (
                <ul className="divide-y divide-line border-t border-line">
                  {enrollments.map((e) => (
                    <li key={e.id} className="flex items-center justify-between gap-4 py-4">
                      <span className="text-graphite">{e.courses?.title || 'Course'}</span>
                      <span className="text-xs uppercase tracking-wide text-ash">{e.status}</span>
                    </li>
                  ))}
                </ul>
              )}
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
