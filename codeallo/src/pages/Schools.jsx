import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import CTASection from '../components/sections/CTASection.jsx'

const programs = [
  {
    title: 'Technology curriculum support',
    description: 'Structured programming, digital literacy and AI curricula that scale across grade levels.',
  },
  {
    title: 'Robotics & IoT programs',
    description: 'Hands-on hardware programs where students build and program real devices, not just read about them.',
  },
  {
    title: 'Coding programs & clubs',
    description: 'Ongoing coding programs and after-school clubs designed to sustain interest beyond a single workshop.',
  },
  {
    title: 'Workshops & hackathons',
    description: 'One-off and recurring events that give students a concentrated, project-based technology experience.',
  },
  {
    title: 'AI education',
    description: 'A grounded, age-appropriate introduction to how AI actually works — not just how to prompt it.',
  },
  {
    title: 'School technology systems',
    description: 'The administrative and academic software that runs day-to-day operations, built for how your school actually works.',
  },
]

export default function Schools() {
  return (
    <>
      <Seo
        title="Solutions for Schools"
        description="Technology curriculum, robotics, coding programs and school management systems for schools in Nepal."
        path="/schools"
      />
      <PageHero
        eyebrow="For Schools"
        title="A technology partner for your whole school, not just your computer lab"
        description="Curriculum, hands-on programs and the underlying systems — planned together, not sold separately."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Schools' }]} />

      <section className="content-wrap py-16 sm:py-24">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div key={program.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{program.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Partner with Codeallo"
        description="Tell us about your school — student numbers, current setup, and what you're hoping to build — and we'll put together a plan."
        primary={{ label: 'Partner with Codeallo', to: '/contact' }}
        secondary={{ label: 'See Teacher Training', to: '/teachers' }}
      />
    </>
  )
}
