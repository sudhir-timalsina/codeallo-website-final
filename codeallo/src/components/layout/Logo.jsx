import { Link } from 'react-router-dom'
import iconBlack from '../../assets/icon-black.png'
import iconWhite from '../../assets/icon-white.png'

export default function Logo({ inverse = false, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Codeallo — home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <img
        src={inverse ? iconWhite : iconBlack}
        alt=""
        className="h-6 w-auto sm:h-7"
        width={64}
        height={68}
      />
      <span
        className={`font-display text-[1.15rem] tracking-[0.04em] sm:text-[1.3rem] ${
          inverse ? 'text-paper' : 'text-ink'
        }`}
      >
        Codeallo
      </span>
    </Link>
  )
}
