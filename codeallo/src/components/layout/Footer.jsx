import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo.jsx'
import { footerColumns } from '../../data/nav.js'
import { siteConfig } from '../../lib/siteConfig.js'

const socialEntries = Object.entries(siteConfig.socials).filter(([, url]) => Boolean(url))

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper">
      <div className="content-wrap grid grid-cols-2 gap-10 py-16 sm:grid-cols-2 md:grid-cols-5 md:gap-8">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-2">
          <Logo inverse />
          <p className="max-w-xs text-sm leading-relaxed text-paper/70">
            An education and technology company based in Kathmandu — we teach
            programming, AI and digital skills, and we build websites, apps
            and software for schools, institutions and businesses.
          </p>
          <ul className="flex flex-col gap-2.5 text-sm text-paper/80">
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-paper/50" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-paper">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-paper/50" />
              <a href={siteConfig.contact.phoneHref} className="hover:text-paper">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="shrink-0 text-paper/50" />
              <span>{siteConfig.address.full}</span>
            </li>
          </ul>
          {socialEntries.length > 0 && (
            <ul className="flex gap-4 pt-1 text-sm text-paper/70">
              {socialEntries.map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} target="_blank" rel="noreferrer" className="capitalize hover:text-paper">
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-paper/45">
              {col.heading}
            </p>
            <ul className="flex flex-col gap-3 text-sm text-paper/80">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-paper/15">
        <div className="content-wrap flex flex-col gap-3 py-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-paper/80">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-paper/80">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
