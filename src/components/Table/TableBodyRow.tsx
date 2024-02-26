import { twMerge } from 'tailwind-merge'

interface TableBodyRowProps {
  children: React.ReactNode
  className?: string
}

export const TableBodyRow = ({ children, className }: TableBodyRowProps) => {
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
