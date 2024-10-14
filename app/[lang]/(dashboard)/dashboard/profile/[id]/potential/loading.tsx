import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Card } from '@/components/card'

const Loading = () => {
  return (
    <Card className="flex flex-col w-full">
      <Skeleton className="w-24 h-10 mt-4" />
      <div className="flex w-full justify-end items-center gap-6 mr-12 ">
        <Skeleton className="w-24 h-7 rounded-full" />
        <Skeleton className="w-24 h-7 rounded-full" />
      </div>
      <div className="flex justify-center py-4 w-full">
        <div className="flex justify-center items-center gap-3  ">
          <Skeleton className="w-16 h-10 mb-2" />
          <Skeleton className="w-16 h-10 mb-2" />
          <Skeleton className="w-28 h-10 mb-2" />
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-10">
        <Skeleton
          className="w-[28rem] h-[28rem]"
          style={{
            clipPath:
              'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
          }}
        ></Skeleton>
      </div>
    </Card>
  )
}

export default Loading
