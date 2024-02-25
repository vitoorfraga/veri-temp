import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface AlertProps {
  children: ReactNode
  className?: string
}

export const Alert = ({ children, className }: AlertProps) => {
  return (
    <div
      className={twMerge('flex justify-center items-center h-24', className)}
    >
      <span className="text-center block flex-1 text-zinc-600 text-sm">
        {children}
      </span>
    </div>
  )
}
