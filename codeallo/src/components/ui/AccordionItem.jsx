import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-line">
      <h3>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-lg text-ink">{question}</span>
          <Plus
            size={18}
            className={`shrink-0 text-ash transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-base leading-relaxed text-graphite">{answer}</p>
        </div>
      )}
    </div>
  )
}
