import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import ServiceCard from '../components/sections/ServiceCard.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { services } from '../data/services.js'

export default function ServicesIndex() {
  return (
    <>
      <Seo
        title="Technology Services"
        description="Website development, app development, IT services, EdTech solutions and technology consulting from Codeallo."
        path="/services"
      />
      <PageHero
        eyebrow="Build"
        title="Technology services for schools, institutions and businesses"
        description="Websites, applications, software and the IT support behind them — built around your actual workflow, not a generic template."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />

      <section className="content-wrap py-16 sm:py-24">
        <div>
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure which service fits?"
        description="Tell us what you're trying to achieve and we'll recommend where to start."
      />
    </>
  )
}
