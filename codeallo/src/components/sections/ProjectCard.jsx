import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block border border-line">
      <div className="flex aspect-[16/10] items-center justify-center border-b border-line bg-bone/60 p-8">
        <span className="font-display text-6xl text-ink/15 transition-colors group-hover:text-ink/25">
          {project.title.charAt(0)}
        </span>
      </div>
      <div className="p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-ash">{project.category}</p>
        <h3 className="font-display text-xl text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-graphite">{project.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Read the case study
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
