import { twMerge } from 'tailwind-merge'

interface TableRowProps {
  children: React.ReactNode
  className?: string
}

export const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <tr
      className={twMerge(
        'hover:bg-gray-100/25 border-b border-b-gray-100',
        className,
      )}
    >
      {children}
    </tr>
  )
}
