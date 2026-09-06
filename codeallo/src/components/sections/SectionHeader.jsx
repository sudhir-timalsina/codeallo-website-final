export default function SectionHeader({ eyebrow, title, description, align = 'left', inverse = false }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-3 text-sm ${inverse ? 'text-paper/60' : 'text-ash'}`}>{eyebrow}</p>
      )}
      <h2
        className={`text-balance font-display text-3xl font-medium sm:text-4xl ${
          inverse ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${inverse ? 'text-paper/75' : 'text-graphite'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
