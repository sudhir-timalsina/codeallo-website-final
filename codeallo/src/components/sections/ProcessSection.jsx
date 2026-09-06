const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We learn how you actually work today, and what the project genuinely needs to achieve.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We map the structure — pages, data, or curriculum — before any design or code begins.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We build in visible stages, sharing progress rather than disappearing until a big reveal.',
  },
  {
    number: '04',
    title: 'Test',
    description: 'We test against real use, real devices and real data, not just the ideal case.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We deploy, hand over documentation, and make sure your team can operate it independently.',
  },
  {
    number: '06',
    title: 'Improve',
    description: 'We stay reachable after launch, because most of what matters shows up once something is in real use.',
  },
]

export default function ProcessSection() {
  return (
    <section className="border-t border-line bg-bone/50 py-24 sm:py-32">
      <div className="content-wrap">
        <div className="max-w-xl">
          <p className="mb-3 text-sm text-ash">How we work</p>
          <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            A process that holds up under a school project or a production system
          </h2>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="border-t border-line pt-6">
              <span className="font-display text-2xl text-ash">{step.number}</span>
              <h3 className="mt-2 font-display text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
