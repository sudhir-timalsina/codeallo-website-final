import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Badge from '../components/ui/Badge.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import NotFound from './NotFound.jsx'
import { supabase } from '../lib/supabaseClient.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    let mounted = true
    setProject(undefined)
    supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
      .then(({ data }) => {
        if (mounted) setProject(data || null)
      })
    return () => {
      mounted = false
    }
  }, [slug])

  if (project === undefined) return <LoadingState label="Loading project" />
  if (project === null) return <NotFound />

  return (
    <>
      <Seo title={project.title} description={project.description} path={`/projects/${project.slug}`} />
      <PageHero eyebrow={`Case Study · ${project.category}`} title={project.title} description={project.description} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.title },
        ]}
      />

      <section className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-10 lg:col-span-8">
          {project.problem && (
            <div>
              <h2 className="font-display text-2xl text-ink">The problem</h2>
              <p className="mt-4 text-base leading-relaxed text-graphite">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="border-t border-line pt-10">
              <h2 className="font-display text-2xl text-ink">The solution</h2>
              <p className="mt-4 text-base leading-relaxed text-graphite">{project.solution}</p>
            </div>
          )}
          {project.result && (
            <div className="border-t border-line pt-10">
              <h2 className="font-display text-2xl text-ink">The result</h2>
              <p className="mt-4 text-base leading-relaxed text-graphite">{project.result}</p>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="border border-line p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ash">Client type</dt>
                <dd className="mt-0.5 text-graphite">{project.client_type}</dd>
              </div>
              <div>
                <dt className="text-ash">Category</dt>
                <dd className="mt-0.5 text-graphite">{project.category}</dd>
              </div>
              {(project.technologies || []).length > 0 && (
                <div>
                  <dt className="mb-2 text-ash">Technologies used</dt>
                  <dd className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </section>

      <CTASection
        title="Building something similar?"
        description="We're happy to talk through what worked, what we'd do differently, and whether the same approach fits your project."
      />
    </>
  )
}
