import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../lib/siteConfig'

// `items` is an array of { label, to } — the last item is treated as the
// current page and is not linked.
export default function Breadcrumbs({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.to || ''}`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="content-wrap pt-8">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ash">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {isLast || !item.to ? (
                <span aria-current="page" className="text-graphite">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-ink">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight size={14} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
