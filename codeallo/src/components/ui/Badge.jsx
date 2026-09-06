export default function Badge({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'border-line text-graphite',
    dark: 'border-ink text-ink',
    inverse: 'border-paper/40 text-paper',
  }

  return (
    <span
      className={`inline-flex items-center border px-3 py-1 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
