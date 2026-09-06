import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  GraduationCap,
  Newspaper,
  FolderKanban,
  MessageSquareQuote,
  Inbox,
  Users,
  ClipboardList,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import Logo from '../components/layout/Logo.jsx'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/courses', label: 'Courses', icon: GraduationCap },
  { to: '/admin/blog', label: 'Blog Posts', icon: Newspaper },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/leads', label: 'Contact Leads', icon: Inbox },
  { to: '/admin/enrollments', label: 'Enrollments', icon: ClipboardList },
  { to: '/admin/users', label: 'Users', icon: Users },
]

export default function AdminLayout() {
  const { signOut, profile, user } = useAuth()

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r border-line bg-paper md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <Logo />
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm ${
                  isActive ? 'bg-ink text-paper' : 'text-graphite hover:bg-bone'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-line px-5 py-4">
          <p className="truncate text-xs text-ash">{profile?.full_name || user?.email}</p>
          <p className="mb-3 text-xs text-ash/70">Signed in as admin</p>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-xs text-graphite hover:text-ink">
              View public site
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs text-graphite hover:text-ink"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </aside>
      <div className="bg-bone/40 px-6 py-8 md:px-10 md:py-10">
        <Outlet />
      </div>
    </div>
  )
}
