import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from '../ui/Button.jsx'
import { navGroups } from '../../data/nav.js'

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="content-wrap flex h-[72px] items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navGroups.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
        </nav>

        <div className="hidden lg:block">
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

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-paper lg:hidden">
          <div className="content-wrap flex flex-col gap-8 py-10">
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
                        onClick={() => setMobileOpen(false)}
                        className="font-display text-2xl text-ink"
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Button to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 w-full">
              Let&rsquo;s Work Together
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
