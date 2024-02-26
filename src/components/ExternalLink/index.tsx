import { AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export const ExternalLink = ({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className={twMerge(
        'py-2 px-4 w-fit border border-gray-200 rounded-full hover:bg-gray-100 transition-colors cursor-pointer',
        className,
      )}
      target="_blank"
      {...props}
    >
      {children}
    </a>
  )
}
