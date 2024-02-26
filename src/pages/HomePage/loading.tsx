import { Skeleton } from '../../components/Skeleton'

export const HomePageLoading = () => {
  return (
    <section>
      <Skeleton className="mb-4 max-w-10 h-6" />
      <Skeleton className="h-80 w-full bg-sky-900" />
      <div className="grid gap-9 mt-6 grid-cols-4 ">
        <Skeleton className="h-[133px] w-full" />
        <Skeleton className="h-[133px] w-full" />
        <Skeleton className="h-[133px] w-full" />
        <Skeleton className="h-[133px] w-full" />
      </div>
    </section>
  )
}
