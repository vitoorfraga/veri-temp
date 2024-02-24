import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

interface SelectFieldProps {
  children: ReactNode
  placeholder?: string
}

export const SelectField = ({ placeholder, children }: SelectFieldProps) => {
  return (
    <Select.Root>
      <Select.Trigger className="flex items-center gap-2 bg-sky-100 p-2 rounded-lg text-sky-950">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="size-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="p-4 bg-sky-100 shadow-sm rounded-lg flex flex-col gap-6 cursor-pointer">
          <Select.Viewport className="flex flex-col gap-4">
            {children}
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
