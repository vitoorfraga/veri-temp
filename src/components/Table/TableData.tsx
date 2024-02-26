import { twMerge } from 'tailwind-merge'

interface TableDataProps {
  children: React.ReactNode
  className?: string
}

export const TableData = ({ children, className }: TableDataProps) => {
  return <td className={twMerge('px-4 py-2', className)}>{children}</td>
}
