import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
  icon?: JSX.Element
}

export const TextField = ({
  label,
  className,
  icon,
  ...props
}: TextFieldProps) => {
  const labelExists = !!label
  const iconExists = !!icon
  return (
    <fieldset
      className={twMerge('flex items-center gap-5 relative', className)}
    >
      {labelExists && (
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input
        className="bg-sky-100 w-full flex-1 items-center justify-center pl-2 pr-10 py-3 text-base leading-none rounded-lg outline-none focus:ring focus:ring-sky-800"
        {...props}
      />

      {iconExists && <div className="absolute right-2">{icon}</div>}
    </fieldset>
  )
}
