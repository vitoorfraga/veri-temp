import { twMerge } from 'tailwind-merge'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={twMerge(
        'gap-2 bg-zinc-200 animate-pulse w-full h-8 rounded-lg cursor-progress',
        className,
      )}
    />
  )
}
