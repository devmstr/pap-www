import { Card } from '@/components/card'
import { Skeleton } from '@/components/ui/skeleton'

const ProfileLoading = () => {
  return (
    <div className="flex flex-col xl:flex-row  w-full font-quicksand gap-6">
      <Card className="flex  flex-col w-full h-full sm:w-96 gap-5 ">
        <div className="flex h-[11rem] justify-start xl:justify-center items-end">
          <Skeleton className=" relative w-36 h-36  rounded-full" />
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="text-3xl font-bold text-foreground ">
            <Skeleton className="w-full h-9" />
          </div>
          <div className="text-md text-muted-foreground font-medium">
            <Skeleton className="w-full h-5" />
          </div>
          <div className="text-sm text-muted-foreground/60 font-medium">
            <span>
              <Skeleton className="w-full h-9" />
            </span>
          </div>
          <div className="flex gap-3 items-center text-md text-muted-foreground/60 font-medium">
            <Skeleton className="w-full h-5" />
          </div>
        </div>
      </Card>

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
          </div>
          <div className="flex flex-col gap-5">
            <div className="w-full mt h-[1px] bg-gray-200/60 " />
            <div className="w-full flex justify-end">
              <Skeleton className="w-full md:w-32 h-12" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProfileLoading
