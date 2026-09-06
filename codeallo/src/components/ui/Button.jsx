import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const variants = {
  primary: 'bg-ink text-paper hover:bg-charcoal',
  secondary: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper',
  inverse: 'bg-paper text-ink hover:bg-bone',
  'inverse-outline': 'bg-transparent text-paper border border-paper/60 hover:border-paper hover:bg-paper hover:text-ink',
  ghost: 'bg-transparent text-ink hover:bg-bone',
}

const sizes = {
  md: 'px-6 py-3 text-[0.95rem]',
  sm: 'px-4 py-2 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {children}
      {icon && <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
