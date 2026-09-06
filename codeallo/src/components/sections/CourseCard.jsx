import { Link } from 'react-router-dom'
import { Clock, BarChart3, Laptop } from 'lucide-react'
import Badge from '../ui/Badge.jsx'

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex flex-col justify-between border border-line p-6 transition-colors hover:border-ink"
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <Badge>{course.category}</Badge>
          {course.status === 'upcoming' && <Badge tone="dark">Registering interest</Badge>}
        </div>
        <h3 className="font-display text-xl text-ink">{course.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-graphite">{course.short}</p>
      </div>

      <dl className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-ash">
        <div className="flex items-center gap-1.5">
          <BarChart3 size={13} />
          <dt className="sr-only">Level</dt>
          <dd>{course.level}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={13} />
          <dt className="sr-only">Duration</dt>
          <dd>{course.duration}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Laptop size={13} />
          <dt className="sr-only">Delivery</dt>
          <dd>{course.delivery}</dd>
        </div>
      </dl>
    </Link>
  )
}
