import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { flexRender } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

import { Card } from '@/components/card'

const Loading = () => {
  return (
    <div>
      <Card className="">
        <Skeleton className="w-24 h-10 mb-2" />
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3  ">
            <Skeleton className="w-72 h-10 mb-2" />
            <Skeleton className="w-28 h-10 mb-2" />
          </div>
          <div className="flex items-center gap-3  ">
            <Skeleton className="w-28 h-10 mb-2" />
            <Skeleton className="w-28 h-10 mb-2" />
          </div>
        </div>
        <div className="w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="">
                <TableRow className="">
                  <TableHead colSpan={5} className="">
                    <Skeleton className="h-4" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="">
                  <TableCell className="w-[60%] h-24 text-center">
                    <div className="flex gap-2 items-center justify-center">
                      <p className="animate-pulse text-muted-foreground">
                        Loading...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="w-24 h-10 mb-2" />
          <Skeleton className="w-24 h-10 mb-2" />
        </div>
      </Card>
    </div>
  )
}

export default Loading
