import {
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogContentProps,
} from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

export const ModalContent = ({ children, ...props }: DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/25 fixed inset-0" />
      <DialogContent
        className=" fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-[25px] focus:outline-none min-h-48"
        {...props}
        forceMount={true}
      >
        {/* 👉🏻 Conteúdo será inserido como children */}
        {children}
        <DialogClose asChild>
          <button
            className="absolute w-6 -top-[12px] -right-[12px] h-6 bg-red-500 text-white rounded-full flex justify-center items-center"
            aria-label="Close"
          >
            <XIcon className="size-5" />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  )
}
