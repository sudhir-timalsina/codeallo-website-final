import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, User } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from '../ui/Button.jsx'
import { navGroups } from '../../data/nav.js'
import { useAuth } from '../../hooks/useAuth.jsx'

function NavDropdown({ group }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 py-2 text-sm text-ink/80 hover:text-ink"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {group.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full min-w-[220px] border border-line bg-paper py-2 shadow-[0_12px_24px_-16px_rgba(10,10,10,0.35)]">
          {group.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-2.5 text-sm text-graphite hover:bg-bone hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// Shows "Log In" for a logged-out visitor, or a link to their dashboard
// (student or admin) once they're signed in. Used in both the desktop bar
// and the mobile menu below.
function AccountLink({ mobile = false, onNavigate }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return null

  if (user) {
    return (
      <Link
        to={isAdmin ? '/admin' : '/dashboard'}
        onClick={onNavigate}
        className={
          mobile
            ? 'flex items-center gap-2 font-display text-2xl text-ink'
            : 'flex items-center gap-1.5 text-sm text-ink/80 hover:text-ink'
        }
      >
        <User size={mobile ? 20 : 15} />
        {isAdmin ? 'Admin' : 'Dashboard'}
      </Link>
    )
  }

  return (
    <Link
      to="/login"
      onClick={onNavigate}
      className={
        mobile
          ? 'flex items-center gap-2 font-display text-2xl text-ink'
          : 'text-sm text-ink/80 hover:text-ink'
      }
    >
      Log In
    </Link>
  )
}

// Rendered through a portal straight to <body> — see the comment on
// `mobileOpen` below for why this can't just live inside <header>.
function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-paper lg:hidden">
      <div className="content-wrap flex h-[72px] shrink-0 items-center justify-between border-b border-line">
        <Logo />
        <button className="p-2" aria-label="Close menu" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <div className="content-wrap flex flex-1 flex-col gap-8 overflow-y-auto py-10">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">
              {group.label}
            </p>
            <ul className="flex flex-col gap-4">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className="font-display text-2xl text-ink"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="border-t border-line pt-8">
          <AccountLink mobile onNavigate={onClose} />
        </div>

        <Button to="/contact" onClick={onClose} className="mt-2 w-full">
          Let&rsquo;s Work Together
        </Button>
      </div>
    </div>,
    document.body
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      {/*
        IMPORTANT: the mobile menu panel must NOT be rendered as a normal
        child here. `backdrop-blur` above applies backdrop-filter, and per
        the CSS spec, any element with a filter/backdrop-filter becomes the
        containing block for `position: fixed` descendants. That silently
        breaks a fixed-position full-screen mobile menu nested inside this
        header (it gets sized relative to the 72px header bar instead of
        the viewport). MobileMenu portals to document.body instead, which
        sidesteps the issue entirely.
      */}
      <div className="content-wrap flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navGroups.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <AccountLink />
          <Button to="/contact" size="sm">
            Let&rsquo;s Work Together
          </Button>
        </div>

        <button
          className="p-2 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
