import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search', label }) {
  return (
    <label className="flex items-center gap-3 border-b border-line py-3 focus-within:border-ink">
      <Search size={18} className="shrink-0 text-ash" aria-hidden="true" />
      <span className="sr-only">{label || placeholder}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-base text-ink placeholder:text-ash focus:outline-none"
      />
    </label>
  )
}
