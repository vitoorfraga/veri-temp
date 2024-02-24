import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="py-2 px-4 bg-sky-100 rounded-lg flex items-center gap-10 hover:bg-sky-200 cursor-pointer transition-colors"
      {...rest}
    >
      {children}
    </button>
  )
}
