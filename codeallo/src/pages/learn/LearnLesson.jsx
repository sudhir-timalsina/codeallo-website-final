import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, Award } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx'
import Button from '../../components/ui/Button.jsx'
import NotFound from '../NotFound.jsx'
import { getLearnCourseBySlug, getLessonBySlug } from '../../data/learnCourses.js'

export default function LearnLesson() {
  const { courseSlug, lessonSlug } = useParams()
  const course = getLearnCourseBySlug(courseSlug)
  const lesson = course && getLessonBySlug(course, lessonSlug)

  if (!course || !lesson) return <NotFound />

  const index = course.lessons.findIndex((l) => l.slug === lessonSlug)
  const prevLesson = index > 0 ? course.lessons[index - 1] : null
  const nextLesson = index < course.lessons.length - 1 ? course.lessons[index + 1] : null
  const isLastLesson = !nextLesson

  return (
    <>
      <Seo
        title={`${lesson.title} — ${course.title}`}
        description={lesson.body[0]}
        path={`/learn/${course.slug}/lesson/${lesson.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Courses', to: '/courses' },
          { label: course.title, to: `/learn/${course.slug}` },
          { label: lesson.title },
        ]}
      />

      <article className="content-wrap max-w-2xl py-12 sm:py-16">
        <p className="text-sm text-ash">
          Lesson {index + 1} of {course.lessons.length} · {course.title}
        </p>
        <h1 className="mt-2 text-balance font-display text-3xl text-ink sm:text-4xl">{lesson.title}</h1>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-ash">
          <Clock size={14} /> {lesson.minutes} min read
        </p>

        <div className="mt-10 space-y-6">
          {lesson.body.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-graphite">
              {paragraph}
            </p>
          ))}
        </div>

        {isLastLesson && (
          <div className="mt-12 border border-ink bg-bone/50 p-6">
            <p className="flex items-center gap-2 font-display text-lg text-ink">
              <Award size={18} /> That&rsquo;s the last lesson
            </p>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              Ready to test what you&rsquo;ve learned? Take the quiz to earn
              your free Codeallo certificate.
            </p>
            <Button to={`/learn/${course.slug}/quiz`} icon className="mt-4">
              Take the Quiz
            </Button>
          </div>
        )}

        <nav className="mt-14 flex items-center justify-between gap-4 border-t border-line pt-6">
          {prevLesson ? (
            <Link
              to={`/learn/${course.slug}/lesson/${prevLesson.slug}`}
              className="flex items-center gap-1.5 text-sm text-graphite hover:text-ink"
            >
              <ArrowLeft size={15} /> {prevLesson.title}
            </Link>
          ) : (
            <Link to={`/learn/${course.slug}`} className="flex items-center gap-1.5 text-sm text-graphite hover:text-ink">
              <ArrowLeft size={15} /> Course overview
            </Link>
          )}

          {nextLesson && (
            <Link
              to={`/learn/${course.slug}/lesson/${nextLesson.slug}`}
              className="flex items-center gap-1.5 text-right text-sm text-graphite hover:text-ink"
            >
              {nextLesson.title} <ArrowRight size={15} />
            </Link>
          )}
        </nav>
      </article>
    </>
  )
}
