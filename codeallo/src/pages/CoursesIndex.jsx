import { useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import SearchBar from '../components/ui/SearchBar.jsx'
import Filter from '../components/ui/Filter.jsx'
import CourseCard from '../components/sections/CourseCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { courses, courseCategories } from '../data/courses.js'

export default function CoursesIndex() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = category === 'All' || course.category === category
      const matchesQuery =
        query.trim() === '' ||
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.short.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <>
      <Seo
        title="Courses"
        description="Programming, web development, AI, machine learning, data science, cybersecurity, robotics and IoT courses from Codeallo."
        path="/courses"
      />
      <PageHero
        eyebrow="Learn"
        title="Technology courses built around real projects"
        description="From programming fundamentals to AI and cybersecurity — taught by people who build this technology professionally, not just teach it from a textbook."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Courses' }]} />

      <section className="content-wrap py-16 sm:py-24">
        <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <Filter options={courseCategories} active={category} onChange={setCategory} label="Filter courses by category" />
          <div className="w-full sm:w-64">
            <SearchBar value={query} onChange={setQuery} placeholder="Search courses" label="Search courses" />
          </div>
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <EmptyState
              title="No courses match your search"
              description="Try a different keyword or clear the category filter."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Don't see a running batch yet?"
        description="We're forming the first cohorts now. Register your interest and we'll notify you as soon as a course opens."
        primary={{ label: 'Register Interest', to: '/contact' }}
      />
    </>
  )
}
