import { Link } from 'react-router-dom'
import { Clock, BarChart3, Laptop, Award, Tag } from 'lucide-react'
import Badge from '../ui/Badge.jsx'

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className={`group flex flex-col justify-between border p-6 transition-colors hover:border-ink ${
        course.isFree ? 'border-ink' : 'border-line'
      }`}
    >
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone={course.isFree ? 'dark' : 'default'}>{course.category}</Badge>
          {course.isFree && <Badge tone="dark">Free</Badge>}
          {course.hasCertificate && (
            <Badge tone="dark" className="flex items-center gap-1">
              <Award size={12} /> Certificate included
            </Badge>
          )}
          {!course.isFree && course.status === 'upcoming' && (
            <Badge>Registering interest</Badge>
          )}
        </div>
        <h3 className="font-display text-xl text-ink">{course.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-graphite">{course.short}</p>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
          <Tag size={13} className="text-ash" />
          {course.price}
        </p>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ash">
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
      </div>
    </Link>
  )
}
