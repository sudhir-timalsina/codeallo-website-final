import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Newspaper, FolderKanban, Inbox } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient.js'

const cards = [
  { key: 'courses', label: 'Courses', to: '/admin/courses', icon: GraduationCap },
  { key: 'blog_posts', label: 'Blog Posts', to: '/admin/blog', icon: Newspaper },
  { key: 'projects', label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { key: 'contact_submissions', label: 'New Leads', to: '/admin/leads', icon: Inbox },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    let mounted = true
    async function loadCounts() {
      const results = await Promise.all(
        cards.map(async (c) => {
          const { count } = await supabase.from(c.key).select('*', { count: 'exact', head: true })
          return [c.key, count ?? 0]
        })
      )
      if (mounted) setCounts(Object.fromEntries(results))
    }
    loadCounts()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Overview</h1>
      <p className="mt-1 text-sm text-graphite">A quick look at what&rsquo;s in the system right now.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ key, label, to, icon: Icon }) => (
          <Link key={key} to={to} className="border border-line bg-paper p-6 transition-colors hover:border-ink">
            <Icon size={20} className="text-graphite" />
            <p className="mt-4 font-display text-3xl text-ink">{counts[key] ?? '—'}</p>
            <p className="mt-1 text-sm text-graphite">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-line bg-paper p-6">
        <h2 className="font-display text-lg text-ink">Note on content sources</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-graphite">
          The public courses, services and projects pages currently render
          from the static data files in <code className="text-xs">src/data/</code>{' '}
          so the site works fully before any Supabase content is added.
          Rows created here in the admin dashboard are stored correctly, but
          wiring the public pages to read from Supabase instead of static
          data is a follow-up step — see the README for how to do that.
        </p>
      </div>
    </div>
  )
}
