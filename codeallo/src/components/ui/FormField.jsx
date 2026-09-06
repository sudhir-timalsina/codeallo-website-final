export default function FormField({
  as = 'input',
  label,
  name,
  error,
  required = false,
  className = '',
  children,
  ...props
}) {
  const inputId = `field-${name}`
  const baseClasses =
    'w-full border border-line bg-paper px-4 py-3 text-ink placeholder:text-ash focus:border-ink focus:outline-none'

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {as === 'textarea' && (
        <textarea id={inputId} name={name} rows={5} className={baseClasses} required={required} {...props} />
      )}

      {as === 'select' && (
        <select id={inputId} name={name} className={baseClasses} required={required} {...props}>
          {children}
        </select>
      )}

      {as === 'input' && (
        <input id={inputId} name={name} className={baseClasses} required={required} {...props} />
      )}

      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
