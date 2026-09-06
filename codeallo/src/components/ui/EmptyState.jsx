export default function EmptyState({ title, description, action = null }) {
  return (
    <div className="flex flex-col items-start gap-3 border border-dashed border-line px-8 py-14 text-left sm:items-center sm:text-center">
      <h3 className="font-display text-xl text-ink">{title}</h3>
      {description && <p className="max-w-md text-sm text-graphite">{description}</p>}
      {action}
    </div>
  )
}
