import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getServiceIcon } from '../../lib/serviceIcons.js'

export default function ServiceCard({ service }) {
  const Icon = getServiceIcon(service.icon)

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-7 first:border-t sm:gap-8"
    >
      <Icon size={22} strokeWidth={1.5} className="text-graphite" aria-hidden="true" />
      <div>
        <h3 className="font-display text-xl text-ink sm:text-2xl">{service.title}</h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-graphite">{service.short}</p>
      </div>
      <ArrowRight
        size={18}
        className="hidden shrink-0 text-ash transition-transform group-hover:translate-x-1 group-hover:text-ink sm:block"
      />
    </Link>
  )
}
