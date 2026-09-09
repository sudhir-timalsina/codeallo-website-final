import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import AccordionItem from '../components/ui/AccordionItem.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { faqCategories } from '../data/faq.js'

export default function FAQ() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }))
    ),
  }

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about Codeallo's free AI courses, certificates, paid courses and technology services."
        path="/faq"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Help"
        title="Frequently asked questions"
        description="Straight answers about our free courses, certificates, paid courses and services. Can't find what you need? Just ask us directly."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />

      <section className="content-wrap max-w-3xl py-16 sm:py-24">
        {faqCategories.map((cat) => (
          <div key={cat.category} className="mb-14 last:mb-0">
            <p className="mb-2 text-sm text-ash">{cat.category}</p>
            <div>
              {cat.items.map((item) => (
                <AccordionItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <CTASection
        title="Still have a question?"
        description="Ask us directly — we read and respond to every message personally."
      />
    </>
  )
}
