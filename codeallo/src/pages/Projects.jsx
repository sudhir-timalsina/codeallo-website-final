import { useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Filter from '../components/ui/Filter.jsx'
import ProjectCard from '../components/sections/ProjectCard.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { projects, projectCategories } from '../data/projects.js'

export default function Projects() {
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () => projects.filter((p) => category === 'All' || p.category === category),
    [category]
  )

  return (
    <>
      <Seo
        title="Projects"
        description="Real projects built by Codeallo — civic technology, EdTech and utility software."
        path="/projects"
      />
      <PageHero
        eyebrow="Our Work"
        title="Projects we've actually built"
        description="Real work for municipal government, civic programs and independent products — including the problems we were solving and how we approached them."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} />

      <section className="content-wrap py-16 sm:py-24">
        <Filter options={projectCategories} active={category} onChange={setCategory} label="Filter projects by category" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <CTASection
        title="Have something similar in mind?"
        description="Tell us about the problem you're trying to solve and we'll tell you honestly whether it's a fit."
      />
    </>
  )
}
