export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-line bg-ink text-paper">
      <div className="content-wrap py-16 sm:py-24">
        {eyebrow && <p className="mb-4 text-sm text-paper/55">{eyebrow}</p>}
        <h1 className="text-balance max-w-3xl font-display text-4xl sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
