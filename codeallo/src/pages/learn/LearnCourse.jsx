import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Clock, Award, ArrowRight } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import PageHero from '../../components/sections/PageHero.jsx'
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx'
import Button from '../../components/ui/Button.jsx'
import NotFound from '../NotFound.jsx'
import { getLearnCourseBySlug, getTotalLessonMinutes } from '../../data/learnCourses.js'

export default function LearnCourse() {
  const { courseSlug } = useParams()
  const course = getLearnCourseBySlug(courseSlug)

  if (!course) return <NotFound />

  const totalMinutes = getTotalLessonMinutes(course)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: 'Codeallo Education and Technologies Pvt. Ltd.' },
  }

  return (
    <>
      <Seo title={course.title} description={course.summary} path={`/learn/${course.slug}`} jsonLd={jsonLd} />
      <PageHero eyebrow={`Free Course · ${course.level}`} title={course.title} description={course.summary} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Courses', to: '/courses' },
          { label: course.title },
        ]}
      />

      <section className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl text-ink">Lessons</h2>
          <p className="mt-2 text-sm text-graphite">
            Read them in order, or jump to any lesson — there&rsquo;s no login
            required until you&rsquo;re ready to take the quiz.
          </p>

          <ol className="mt-6 divide-y divide-line border-y border-line">
            {course.lessons.map((lesson, index) => (
              <li key={lesson.slug}>
                <Link
                  to={`/learn/${course.slug}/lesson/${lesson.slug}`}
                  className="group flex items-center justify-between gap-4 py-4 hover:bg-bone/40"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-display text-lg text-ash">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-base text-ink">{lesson.title}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-ash">
                    <Clock size={13} /> {lesson.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-8 border border-ink bg-bone/50 p-6">
            <p className="flex items-center gap-2 font-display text-lg text-ink">
              <Award size={18} /> Ready to get certified?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              Once you&rsquo;ve read through the lessons, take the short quiz
              below. You&rsquo;ll need to be logged in so your name can go on
              the certificate — if you don&rsquo;t have an account yet, it takes
              about a minute to create one.
            </p>
            <Button to={`/learn/${course.slug}/quiz`} icon className="mt-4">
              Take the Quiz
            </Button>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ash">Level</dt>
                <dd className="mt-0.5 text-graphite">{course.level}</dd>
              </div>
              <div>
                <dt className="text-ash">Estimated reading time</dt>
                <dd className="mt-0.5 text-graphite">{totalMinutes} minutes, plus the quiz</dd>
              </div>
              <div>
                <dt className="text-ash">Certificate</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-graphite">
                  <CheckCircle2 size={14} /> Free, issued automatically on passing
                </dd>
              </div>
            </dl>
          </div>

          <Link
            to="/courses"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink"
          >
            <ArrowRight size={14} className="rotate-180" /> Back to all courses
          </Link>
        </aside>
      </section>
    </>
  )
}
