import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { siteConfig } from '../lib/siteConfig.js'

export default function About() {
  return (
    <>
      <Seo
        title="About Codeallo"
        description="Codeallo is a Kathmandu-based EdTech and technology company working at the intersection of education, technology and innovation."
        path="/about"
      />
      <PageHero
        eyebrow="About Codeallo"
        title="Education and technology, built by the same team"
        description="Codeallo exists because the people who teach technology and the people who build it are, in our experience, too often different companies with different priorities. We do both."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />

      <section className="content-wrap grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl text-ink">What we believe</h2>
          <div className="mt-5 space-y-5 text-base leading-relaxed text-graphite">
            <p>
              Most technology education stays theoretical, and most software
              gets built without anyone involved having taught a single
              class. We think that gap costs everyone — students who learn
              concepts they can&rsquo;t apply, and organizations who commission
              software from people who&rsquo;ve never had to use the systems they
              build.
            </p>
            <p>
              Codeallo is built around closing that gap. Our courses come
              from work we actually do: web development taught by people who
              build websites for a living, AI and data science taught with
              real datasets and real tools, not slides borrowed from a
              textbook.
            </p>
            <p>
              On the other side, our technology services are shaped by an
              education mindset — we explain what we&rsquo;re building and why,
              document it properly, and make sure the people who&rsquo;ll operate
              a system day to day actually understand it before we call a
              project finished.
            </p>
          </div>

          <h2 className="mt-14 font-display text-2xl text-ink">Who we work with</h2>
          <div className="mt-5 space-y-5 text-base leading-relaxed text-graphite">
            <p>
              We work with students learning to code for the first time,
              schools building a technology curriculum, teachers and
              educators developing their own digital skills, and businesses
              and institutions that need a website, an application, or an
              outside technical perspective.
            </p>
            <p>
              Locally, that has included municipal government offices in
              Kathmandu and civic education programs. More broadly, we work
              as technology consultants with business clients internationally
              on digital auditing, AI adoption and cybersecurity.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-6">
            <h3 className="font-display text-lg text-ink">Codeallo, at a glance</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-ash">Legal name</dt>
                <dd className="mt-0.5 text-graphite">{siteConfig.legalName}</dd>
              </div>
              <div>
                <dt className="text-ash">Based in</dt>
                <dd className="mt-0.5 text-graphite">{siteConfig.address.full}</dd>
              </div>
              <div>
                <dt className="text-ash">PAN</dt>
                <dd className="mt-0.5 text-graphite">{siteConfig.business.pan}</dd>
              </div>
              <div>
                <dt className="text-ash">Focus areas</dt>
                <dd className="mt-0.5 text-graphite">
                  Technology education, web &amp; app development, IT services,
                  EdTech solutions, technology consulting
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <CTASection
        title="Want to know if we're a fit for your school or project?"
        description="The fastest way to find out is to tell us what you're working on."
        primary={{ label: 'Contact Us', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/projects' }}
      />
    </>
  )
}
