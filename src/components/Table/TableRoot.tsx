import { ReactNode } from 'react'

export const TableRoot = ({ children }: { children: ReactNode }) => {
  return (
    <table className="w-full min-w-full shadow-sm table-fixed overflow-hidden rounded-md ring-1 ring-gray-100">
      {children}
    </table>
  )
}
