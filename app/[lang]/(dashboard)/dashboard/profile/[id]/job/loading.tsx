import { Card } from '@/components/card'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col w-full gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>

          <div className="flex flex-col col-span-2 xl:col-span-3 gap-1">
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-full h-36 xl:h-24  mb-2" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-full mt h-[1px] bg-gray-200/60 " />
          <div className="w-full flex justify-end">
            <Skeleton className="w-full md:w-32 h-12" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Loading
