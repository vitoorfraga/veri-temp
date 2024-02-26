import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeadRowProps {
  children: ReactNode
  className?: string
}

export const TableHeeadRow = ({ children, className }: TableHeadRowProps) => {
  return (
    <tr className={twMerge('bg-sky-100/50 text-left text-blue-900', className)}>
      {children}
    </tr>
  )
}
