import Seo from '../components/Seo.jsx'
import HomeHero from '../components/sections/HomeHero.jsx'
import PillarsSection from '../components/sections/PillarsSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import WhyCodeallo from '../components/sections/WhyCodeallo.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { siteConfig } from '../lib/siteConfig.js'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressRegion: 'Bagmati Province',
    addressCountry: 'NP',
    streetAddress: siteConfig.address.line1,
  },
  description: siteConfig.description,
}

export default function Home() {
  return (
    <>
      <Seo
        title="Technology Education & Digital Solutions in Nepal"
        description={siteConfig.description}
        path="/"
        jsonLd={jsonLd}
      />
      <HomeHero />
      <PillarsSection />
      <ProcessSection />
      <WhyCodeallo />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
