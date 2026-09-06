import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import CTASection from '../components/sections/CTASection.jsx'

const areas = [
  'Digital literacy fundamentals for non-technical staff',
  'Teaching programming without a computer science background',
  'Using AI tools responsibly in the classroom',
  'Building a technology curriculum for your subject or grade level',
  'Running a coding club or after-school program',
  'Basic troubleshooting so small issues don\u2019t require outside help',
]

export default function Teachers() {
  return (
    <>
      <Seo
        title="Teacher & Educator Training"
        description="Practical technology training for teachers and educators — from digital literacy to teaching programming."
        path="/teachers"
      />
      <PageHero
        eyebrow="For Teachers & Educators"
        title="Training built for teachers, not software engineers"
        description="We train teachers to confidently use and teach technology — starting from wherever they currently are, not assuming prior technical background."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Teachers' }]} />

      <section className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl text-ink">What we cover</h2>
          <ul className="mt-5 space-y-3">
            {areas.map((area) => (
              <li key={area} className="border-t border-line pt-3 text-base leading-relaxed text-graphite">
                {area}
              </li>
            ))}
          </ul>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-6">
            <h3 className="font-display text-lg text-ink">How training is delivered</h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              We work with your school to design a training format that
              fits — a single workshop day, a term-long series, or ongoing
              support built around your existing schedule.
            </p>
          </div>
        </aside>
      </section>

      <CTASection
        title="Bring training to your school"
        description="Tell us your subject areas and current comfort level with technology, and we'll design a session that starts where you actually are."
      />
    </>
  )
}
