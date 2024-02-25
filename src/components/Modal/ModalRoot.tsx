import { Dialog, DialogProps } from '@radix-ui/react-dialog'

export const ModalRoot = ({ children, ...props }: DialogProps) => {
  return <Dialog {...props}>{children}</Dialog>
}
