import { siteConfig } from '../../lib/siteConfig.js'

// lucide-react dropped brand/logo icons in recent versions, so the
// WhatsApp mark is a small inline SVG rather than an import (same
// approach as the LinkedIn icon on the certificate page).
function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={26} height={26} aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.56-.89-2.14-.24-.57-.48-.49-.65-.5h-.56c-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.42 0 1.42 1.05 2.8 1.2 3 .15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.35.19 1.85.12.57-.09 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.2-.55-.34zM12.02 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.68.44 3.25 1.2 4.61L2.5 21.5l4.99-1.19a9.46 9.46 0 0 0 4.53 1.15h.01c5.24 0 9.5-4.26 9.5-9.5s-4.27-9.46-9.51-9.46zm0 17.14h-.01a7.62 7.62 0 0 1-3.88-1.06l-.28-.16-2.96.7.71-2.88-.18-.29a7.6 7.6 0 0 1-1.17-4.05c0-4.22 3.44-7.65 7.68-7.65 2.05 0 3.98.8 5.43 2.25a7.61 7.61 0 0 1 2.25 5.42c0 4.23-3.44 7.72-7.59 7.72z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const message = "Hi Codeallo, I'd like to ask about your courses/services."
  const whatsappUrl = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(message)}`

  return (
    
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Codeallo on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 print:hidden"
    >
      <WhatsAppIcon />
    </a>
  )
}
