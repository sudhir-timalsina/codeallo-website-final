import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { CheckCircle2, XCircle, Award } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx'
import Button from '../../components/ui/Button.jsx'
import NotFound from '../NotFound.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'
import { supabase } from '../../lib/supabaseClient.js'
import { getLearnCourseBySlug } from '../../data/learnCourses.js'
import { generateCertificateId } from '../../utils/certificateId.js'

const PASSING_SCORE = 70

export default function LearnQuiz() {
  const { courseSlug } = useParams()
  const course = getLearnCourseBySlug(courseSlug)
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [issuing, setIssuing] = useState(false)
  const [issueError, setIssueError] = useState('')

  if (!course) return <NotFound />

  const allAnswered = course.quiz.every((q) => answers[q.id])

  const handleSelect = (questionId, optionId) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const correctCount = course.quiz.filter((q) => answers[q.id] === q.correctOptionId).length
    const percent = Math.round((correctCount / course.quiz.length) * 100)
    setScore(percent)
    setSubmitted(true)

    if (percent >= PASSING_SCORE) {
      setIssuing(true)
      setIssueError('')

      const certificateId = generateCertificateId(course.slug)
      const fullName = profile?.full_name || user.email

      const { error } = await supabase.from('certificates').insert({
        id: certificateId,
        user_id: user.id,
        full_name: fullName,
        course_slug: course.slug,
        course_title: course.title,
        hours_label: course.hours,
        score_percent: percent,
      })

      setIssuing(false)

      if (error) {
        setIssueError('Your quiz was scored, but we couldn\u2019t issue the certificate automatically. Please try again or contact us.')
        return
      }

      navigate(`/certificate/${certificateId}`)
    }
  }

  const handleRetake = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setIssueError('')
  }

  const passed = score >= PASSING_SCORE

  return (
    <>
      <Seo title={`Quiz — ${course.title}`} path={`/learn/${course.slug}/quiz`} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Courses', to: '/courses' },
          { label: course.title, to: `/learn/${course.slug}` },
          { label: 'Quiz' },
        ]}
      />

      <div className="content-wrap max-w-2xl py-12 sm:py-16">
        <p className="text-sm text-ash">Final quiz</p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{course.title}</h1>
        <p className="mt-3 text-base text-graphite">
          {course.quiz.length} questions · pass with {PASSING_SCORE}% or higher to receive your certificate.
        </p>

        {submitted && (
          <div className={`mt-8 border p-6 ${passed ? 'border-ink bg-bone/50' : 'border-line bg-bone/30'}`}>
            {passed ? (
              <>
                <p className="flex items-center gap-2 font-display text-lg text-ink">
                  <Award size={18} /> You passed — {score}%
                </p>
                {issuing && <p className="mt-2 text-sm text-graphite">Issuing your certificate…</p>}
                {issueError && <p className="mt-2 text-sm text-error">{issueError}</p>}
              </>
            ) : (
              <>
                <p className="font-display text-lg text-ink">You scored {score}%</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">
                  You need {PASSING_SCORE}% to pass. Have another read through
                  the lessons and try again — there&rsquo;s no limit on attempts.
                </p>
                <div className="mt-4 flex gap-3">
                  <Button onClick={handleRetake} size="sm">Retake Quiz</Button>
                  <Button to={`/learn/${course.slug}`} variant="secondary" size="sm">Review Lessons</Button>
                </div>
              </>
            )}
          </div>
        )}

        {!submitted && (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-10">
            {course.quiz.map((question, qIndex) => (
              <fieldset key={question.id} className="border-t border-line pt-6">
                <legend className="font-display text-lg text-ink">
                  {qIndex + 1}. {question.prompt}
                </legend>
                <div className="mt-4 flex flex-col gap-2">
                  {question.options.map((option) => {
                    const checked = answers[question.id] === option.id
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                          checked ? 'border-ink bg-bone/50' : 'border-line hover:border-line-strong'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.id}
                          checked={checked}
                          onChange={() => handleSelect(question.id, option.id)}
                          className="accent-ink"
                        />
                        <span className="text-graphite">{option.text}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}

            <Button type="submit" disabled={!allAnswered} className="self-start">
              Submit Quiz
            </Button>
          </form>
        )}

        {submitted && (
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-lg text-ink">Answer review</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {course.quiz.map((question) => {
                const isCorrect = answers[question.id] === question.correctOptionId
                const correctOption = question.options.find((o) => o.id === question.correctOptionId)
                return (
                  <li key={question.id} className="border-t border-line pt-4 text-sm">
                    <p className="flex items-start gap-2 text-graphite">
                      {isCorrect ? (
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-ink" />
                      ) : (
                        <XCircle size={16} className="mt-0.5 shrink-0 text-ash" />
                      )}
                      <span>{question.prompt}</span>
                    </p>
                    {!isCorrect && (
                      <p className="mt-1.5 pl-6 text-ash">Correct answer: {correctOption?.text}</p>
                    )}
                    <p className="mt-1.5 pl-6 text-ash">{question.explanation}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {passed && !issuing && !issueError && (
          <p className="mt-6 text-sm text-graphite">
            Redirecting you to your certificate… if nothing happens,{' '}
            <Link to="/dashboard" className="text-ink underline underline-offset-4">check your dashboard</Link>.
          </p>
        )}
      </div>
    </>
  )
}
