import Button from '../ui/Button.jsx'

export default function CTASection({
  title = 'Have a project or a class in mind?',
  description = 'Tell us what you\u2019re trying to do and we\u2019ll tell you plainly whether, and how, we can help.',
  primary = { label: 'Get in Touch', to: '/contact' },
  secondary = null,
}) {
  return (
    <section className="border-t border-line bg-ink py-20 text-paper sm:py-28">
      <div className="content-wrap flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-balance font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-paper/70">{description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-4">
          <Button to={primary.to} variant="inverse" icon>
            {primary.label}
          </Button>
          {secondary && (
            <Button to={secondary.to} variant="inverse-outline">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
