import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { courses } from '../../data/courses.js'
import { services } from '../../data/services.js'

const courseLinks = courses.slice(0, 6)
const serviceLinks = services.slice(0, 5)

export default function PillarsSection() {
  return (
    <section className="content-wrap py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        {/* LEARN — wide, descriptive column */}
        <div className="lg:col-span-5">
          <p className="mb-4 text-sm text-ash">What we do — 01</p>
          <h3 className="font-display text-3xl text-ink">Learn</h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-graphite">
            Courses, workshops and structured programs in programming, AI and
            digital skills — for students learning to code for the first
            time, and for schools building a real technology curriculum.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-graphite">
            {courseLinks.map((course) => (
              <li key={course.slug}>
                <Link to={`/courses/${course.slug}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/courses" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            Explore all courses <ArrowRight size={15} />
          </Link>
        </div>

        {/* BUILD — bordered list column */}
        <div className="border-t border-line pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="mb-4 text-sm text-ash">What we do — 02</p>
          <h3 className="font-display text-3xl text-ink">Build</h3>
          <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
            {serviceLinks.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="flex items-center justify-between gap-4 py-3.5 text-sm text-graphite hover:text-ink"
                >
                  {service.title}
                  <ArrowRight size={15} className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* TRANSFORM — statement column */}
        <div className="border-t border-line pt-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="mb-4 text-sm text-ash">What we do — 03</p>
          <h3 className="font-display text-3xl text-ink">Transform</h3>
          <p className="mt-4 text-base leading-relaxed text-graphite">
            IT services, technology consulting and EdTech solutions for
            organizations that need an outside technical partner — not just
            software, but a way of working better.
          </p>
          <Link to="/services/consulting" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            See consulting services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
