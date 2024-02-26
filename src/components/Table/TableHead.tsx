import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
  className?: string
}

export const TableHead = ({ children, className }: TableHeadProps) => {
  return (
    <thead className={twMerge('text-gray-300', className)}>{children}</thead>
  )
}
