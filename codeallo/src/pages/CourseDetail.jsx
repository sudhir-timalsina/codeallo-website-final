import { useParams } from 'react-router-dom'
import { Clock, BarChart3, Laptop, CheckCircle2, Award, Tag } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import InterestForm from '../components/sections/InterestForm.jsx'
import NotFound from './NotFound.jsx'
import { getCourseBySlug } from '../data/courses.js'
import { siteConfig } from '../lib/siteConfig.js'

export default function CourseDetail() {
  const { slug } = useParams()
  const course = getCourseBySlug(slug)

  if (!course) return <NotFound />

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'Codeallo Education and Technologies Pvt. Ltd.',
      sameAs: siteConfig.url,
    },
    ...(course.isFree ? { isAccessibleForFree: true } : {}),
  }

  return (
    <>
      <Seo title={course.title} description={course.description} path={`/courses/${course.slug}`} jsonLd={jsonLd} />
      <PageHero eyebrow={`Course · ${course.category}`} title={course.title} description={course.short} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Courses', to: '/courses' },
          { label: course.title },
        ]}
      />

      <section className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl text-ink">About this course</h2>
          <p className="mt-4 text-base leading-relaxed text-graphite">{course.description}</p>

          <h2 className="mt-12 font-display text-2xl text-ink">What you&rsquo;ll be able to do</h2>
          <ul className="mt-5 space-y-3">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 border-t border-line pt-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                <span className="text-base leading-relaxed text-graphite">{outcome}</span>
              </li>
            ))}
          </ul>

          {course.isFree && (
            <div className="mt-10 border border-ink bg-bone/50 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <Award size={16} /> Free online certification available
              </p>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                This course is completely free and open to everyone — no
                enrollment required. Read the lessons at your own pace, pass
                the short quiz at the end, and you&rsquo;ll automatically
                receive a Codeallo certificate with your name on it. You
                only need an account to take the quiz and get your
                certificate — the lessons themselves are open to anyone.
              </p>
            </div>
          )}

          {!course.isFree && course.status === 'upcoming' && (
            <div className="mt-10 border border-line bg-bone/50 p-5">
              <p className="text-sm leading-relaxed text-graphite">
                This course doesn&rsquo;t have a running batch yet. We&rsquo;re forming the first
                cohort now — register your interest below and we&rsquo;ll reach out
                as soon as dates are confirmed.
              </p>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone="dark">
                {course.isFree ? 'Free' : course.status === 'upcoming' ? 'Registering interest' : 'Enrolling'}
              </Badge>
              {course.hasCertificate && <Badge tone="dark">Certificate included</Badge>}
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-center gap-2.5">
                <Tag size={16} className="text-ash" />
                <dt className="sr-only">Price</dt>
                <dd className="font-medium text-ink">{course.price}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <BarChart3 size={16} className="text-ash" />
                <dt className="sr-only">Level</dt>
                <dd className="text-graphite">{course.level}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-ash" />
                <dt className="sr-only">Duration</dt>
                <dd className="text-graphite">{course.duration}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <Laptop size={16} className="text-ash" />
                <dt className="sr-only">Delivery</dt>
                <dd className="text-graphite">{course.delivery}</dd>
              </div>
            </dl>
          </div>

          {course.isFree ? (
            <Button to={`/learn/${course.learnSlug}`} icon className="w-full justify-center">
              Start Learning Free
            </Button>
          ) : (
            <InterestForm serviceLabel={`Course: ${course.title}`} submitLabel="Register Interest" />
          )}
        </aside>
      </section>
    </>
  )
}
