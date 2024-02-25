import { twMerge } from 'tailwind-merge'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'success' | 'destructive' | 'outline' | 'warn'
}

export const Badge = ({
  className,
  children,
  variant = 'success',
}: BadgeProps) => {
  const baseStyle = ' px-2 font-medium rounded-full w-fit'

  const badgeVariants = {
    success: 'bg-green-400/10 text-green-400',
    warn: 'bg-yellow-600/10 text-yellow-600',
    destructive: 'bg-red-400/10 text-red-400',
    outline: 'border border-gray-300',
  }

  const chosenVariantAndBaseStyle = badgeVariants[variant] + baseStyle

  return (
    <div className={twMerge(chosenVariantAndBaseStyle, className)}>
      {children}
    </div>
  )
}
