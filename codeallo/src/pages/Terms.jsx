import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import { siteConfig } from '../lib/siteConfig.js'

export default function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions" path="/terms" />
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]} />

      <section className="content-wrap max-w-2xl py-16 sm:py-24">
        <div className="space-y-8 text-base leading-relaxed text-graphite">
          <p>
            These terms govern your use of this website, operated by{' '}
            {siteConfig.legalName}. Replace or expand this page with legal
            review before formal launch — this is a starting template, not
            finished legal copy.
          </p>

          <div>
            <h2 className="font-display text-xl text-ink">Use of this site</h2>
            <p className="mt-3">
              This website provides information about Codeallo&rsquo;s courses,
              services and projects. Course availability, pricing and
              scheduling described on this site are subject to change and
              confirmed directly at the time of enrollment.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Accounts</h2>
            <p className="mt-3">
              If you create an account, you are responsible for keeping your
              login credentials secure and for activity that occurs under
              your account.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Intellectual property</h2>
            <p className="mt-3">
              Content on this site, including text, course materials and the
              Codeallo name and logo, belongs to {siteConfig.legalName}
              unless otherwise noted, and may not be reproduced without
              permission.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-ink underline underline-offset-4">
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
