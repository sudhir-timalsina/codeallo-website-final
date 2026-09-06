import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import { siteConfig } from '../lib/siteConfig.js'

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy Policy" path="/privacy-policy" />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />

      <section className="content-wrap max-w-2xl py-16 sm:py-24">
        <div className="space-y-8 text-base leading-relaxed text-graphite">
          <p>
            This policy explains what information {siteConfig.legalName}
            ("Codeallo", "we", "us") collects through this website and how
            it&rsquo;s used. Replace or expand this policy with legal review
            before formal launch if you operate in jurisdictions with
            specific disclosure requirements (for example GDPR or CCPA).
          </p>

          <div>
            <h2 className="font-display text-xl text-ink">Information we collect</h2>
            <p className="mt-3">
              When you submit the contact form, register for an account, or
              register interest in a course, we collect the information you
              provide directly — such as your name, email address, phone
              number, organization and message content. If you create an
              account, Supabase Authentication manages your credentials
              securely; we never see or store your raw password.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">How we use it</h2>
            <p className="mt-3">
              We use the information you provide to respond to enquiries,
              manage course and enrollment communication, and operate your
              account if you register. We do not sell personal information
              to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Data storage</h2>
            <p className="mt-3">
              Website data is stored using Supabase, with access controlled
              through Row Level Security policies so that account holders can
              only see their own data, and administrative data is restricted
              to authorized Codeallo staff.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Contact</h2>
            <p className="mt-3">
              Questions about this policy can be sent to{' '}
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
