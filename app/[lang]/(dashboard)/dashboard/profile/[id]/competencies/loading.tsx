import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/card'

const Loading = () => {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Skeleton className="w-52 h-5 rounded-lg"></Skeleton>
        <Skeleton className="w-1/3 h-4 rounded-lg"></Skeleton>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 px-4 py-5 flex-wrap border rounded-md min-h-16">
          {['1', '2', '3', '4'].map((i) => (
            <Skeleton key={i} className={'flex  h-8 w-36 '}></Skeleton>
          ))}
        </div>
      </div>
      <div className={'flex flex-col  border rounded-md px-6 py-3 w-96 gap-2'}>
        <div className="flex justify-between items-center">
          <Skeleton className="w-28 h-6"></Skeleton>
          <div className="flex gap-1">
            <Skeleton className="h-[16] w-full" />
          </div>
        </div>
        <div className="border-b my-1 opacity-60"></div>
        <div className="flex flex-col gap-4 py-3 ">
          <div className="flex gap-2 items-center text-sm ">
            <Skeleton className="h-[0.65rem] w-full" />
          </div>
          <div className="flex gap-2 items-center text-sm ">
            <Skeleton className="h-[0.65rem] w-full" />
          </div>
          <div className="flex gap-2 items-center text-sm ">
            <Skeleton className="h-[0.65rem] w-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full"></div>
    </Card>
  )
}

export default Loading
