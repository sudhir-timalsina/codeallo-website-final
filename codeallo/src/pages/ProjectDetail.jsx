import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Badge from '../components/ui/Badge.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import NotFound from './NotFound.jsx'
import { getProjectBySlug } from '../data/projects.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  return (
    <>
      <Seo title={project.title} description={project.short} path={`/projects/${project.slug}`} />
      <PageHero eyebrow={`Case Study · ${project.category}`} title={project.title} description={project.short} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.title },
        ]}
      />

      <section className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-10 lg:col-span-8">
          <div>
            <h2 className="font-display text-2xl text-ink">The problem</h2>
            <p className="mt-4 text-base leading-relaxed text-graphite">{project.problem}</p>
          </div>
          <div className="border-t border-line pt-10">
            <h2 className="font-display text-2xl text-ink">The solution</h2>
            <p className="mt-4 text-base leading-relaxed text-graphite">{project.solution}</p>
          </div>
          <div className="border-t border-line pt-10">
            <h2 className="font-display text-2xl text-ink">The result</h2>
            <p className="mt-4 text-base leading-relaxed text-graphite">{project.result}</p>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="border border-line p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ash">Client type</dt>
                <dd className="mt-0.5 text-graphite">{project.clientType}</dd>
              </div>
              <div>
                <dt className="text-ash">Category</dt>
                <dd className="mt-0.5 text-graphite">{project.category}</dd>
              </div>
              <div>
                <dt className="mb-2 text-ash">Technologies used</dt>
                <dd className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </dd>
              </div>
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
