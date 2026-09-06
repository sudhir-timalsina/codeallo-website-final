const reasons = [
  {
    title: 'We sit at both ends of the table',
    description:
      'We teach the skills and we build the systems, so we understand both what students need to learn and what employers and institutions actually need built.',
  },
  {
    title: 'Practical over theoretical',
    description:
      'Our courses are built around real projects, not slide decks. Our software is built around your actual workflow, not a generic template.',
  },
  {
    title: 'Built for Nepal, capable anywhere',
    description:
      'We understand local conventions — from the Bikram Sambat calendar to PAN invoicing to trilingual communication — while working with the same modern tools used internationally.',
  },
  {
    title: 'Small enough to stay accountable',
    description:
      'You work directly with the people building your project or teaching your course, not a rotating account team.',
  },
]

export default function WhyCodeallo() {
  return (
    <section className="content-wrap py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="mb-3 text-sm text-ash">Why Codeallo</p>
          <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            Education and technology, handled by the same team
          </h2>
        </div>

        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="border-t border-line pt-6">
              <dt className="font-display text-xl text-ink">{reason.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-graphite">{reason.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
