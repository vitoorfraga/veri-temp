import * as Select from '@radix-ui/react-select'
import { ReactNode, forwardRef } from 'react'

interface SelectItemProps extends Select.SelectItemProps {
  children: ReactNode
}

export const SelectItem = forwardRef<HTMLInputElement, SelectItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <Select.Item
        className="p-2 rounded-lg outline-none hover:bg-sky-200"
        {...props}
        ref={ref}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator />
      </Select.Item>
    )
  },
)

// 👉🏻 Configura displayName do componente.
SelectItem.displayName = 'SelectItem'
