import { useParams, Link } from 'react-router-dom'
import { getServiceIcon } from '../lib/serviceIcons.js'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import NotFound from './NotFound.jsx'
import { getServiceBySlug, services } from '../data/services.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFound />

  const Icon = getServiceIcon(service.icon)
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.summary,
    provider: { '@type': 'Organization', name: 'Codeallo Education and Technologies Pvt. Ltd.' },
    areaServed: 'Nepal',
  }

  return (
    <>
      <Seo title={service.title} description={service.summary} path={`/services/${service.slug}`} jsonLd={jsonLd} />
      <PageHero eyebrow="Service" title={service.title} description={service.summary} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      />

      <section className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl text-ink">What&rsquo;s included</h2>
          <ul className="mt-5 space-y-3">
            {service.included.map((item) => (
              <li key={item} className="border-t border-line pt-3 text-base leading-relaxed text-graphite">
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-display text-2xl text-ink">How the project runs</h2>
          <ol className="mt-5 space-y-5">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-lg text-ash">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-base leading-relaxed text-graphite">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-6">
            <Icon size={26} strokeWidth={1.5} className="text-ink" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg text-ink">Who this is for</h3>
            <ul className="mt-3 space-y-2 text-sm text-graphite">
              {service.whoFor.map((who) => (
                <li key={who}>{who}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border border-line p-6">
            <h3 className="font-display text-lg text-ink">Other services</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-graphite underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <CTASection
        title={`Ready to talk about ${service.title.toLowerCase()}?`}
        description="Tell us about your organization and what you're trying to solve."
      />
    </>
  )
}
