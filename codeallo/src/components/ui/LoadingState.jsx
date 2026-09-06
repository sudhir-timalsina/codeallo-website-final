export default function LoadingState({ label = 'Loading' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-4 py-24 text-ash"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink" />
      <p className="text-sm">{label}…</p>
    </div>
  )
}
