export default function Filter({ options, active, onChange, label = 'Filter by category' }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('All')}
        aria-pressed={active === 'All'}
        className={`border px-4 py-2 text-sm transition-colors ${
          active === 'All' ? 'border-ink bg-ink text-paper' : 'border-line text-graphite hover:border-ink'
        }`}
      >
        All
      </button>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={`border px-4 py-2 text-sm transition-colors ${
            active === option ? 'border-ink bg-ink text-paper' : 'border-line text-graphite hover:border-ink'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
