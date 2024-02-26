import { twMerge } from 'tailwind-merge'

interface TableHeadProps {
  children: React.ReactNode
  className?: string
}

export const TableHeader = ({ children, className }: TableHeadProps) => {
  return (
    <th className={twMerge('px-4 py-4 font-semibold text-sm', className)}>
      {children}
    </th>
  )
}
