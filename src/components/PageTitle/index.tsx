import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  className?: string
}

export const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1
      className={twMerge(
        'font-bold text-4xl text-sky-950 flex gap-3',
        className,
      )}
    >
      {children}
    </h1>
  )
}
