import { useEffect, useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Filter from '../components/ui/Filter.jsx'
import ProjectCard from '../components/sections/ProjectCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { projectCategories } from '../data/projects.js'

export default function Projects() {
  const [category, setCategory] = useState('All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return
        if (!error) setProjects(data || [])
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(
    () => projects.filter((p) => category === 'All' || p.category === category),
    [projects, category]
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
        <div className="mt-10">
          {loading ? (
            <LoadingState label="Loading projects" />
          ) : filtered.length === 0 ? (
            <EmptyState
              title={projects.length === 0 ? 'No projects published yet' : 'No projects in this category'}
              description={projects.length === 0 ? 'Check back soon.' : 'Try a different category.'}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Have something similar in mind?"
        description="Tell us about the problem you're trying to solve and we'll tell you honestly whether it's a fit."
      />
    </>
  )
}
