import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        className="py-2 px-4 bg-sky-100 rounded-lg flex items-center gap-10 hover:bg-sky-200 cursor-pointer transition-colors"
        {...props}
        ref={ref}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
