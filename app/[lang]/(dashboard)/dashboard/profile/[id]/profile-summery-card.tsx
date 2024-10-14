'use client'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_PFP_IMG_PATH } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { YearAndMonthFrom, cn } from '@/lib/utils'
import { Dictionary } from '@/types'
import { useSession } from 'next-auth/react'
import Img from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ProfileSummeryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  t: Dictionary
  data?: {
    firstName?: string
    lastName?: string
    position?: string
    employedAt?: string
    email?: string
    image?: string
    company?: string
    Boss?: {
      id: string
      displayName: string
    }
  }
}

export const ProfileSummery = ({ t, data }: ProfileSummeryCardProps) => {
  const api = useClientApi()

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    data?.image as string
  )

  return (
    <div className="flex flex-col sm:flex-row xl:flex-col gap-5 md:pl-4 lg:p-0">
      <div className="h-auto">
        <div className="flex justify-start xl:justify-center items-center">
          <div
            className={cn(
              'relative w-40  h-40 bg-gray-200 rounded-full border-[6px] border-gray-200'
            )}
          >
            <Img
              width={300}
              height={300}
              className="w-ful  h-full object-cover object-center rounded-full "
              src={data?.image as string}
              alt="pfp-image"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col gap-2 ">
        <div className="text-3xl font-bold text-foreground ">
          <span className="capitalize">
            {data?.firstName + ' ' + data?.lastName}
          </span>
        </div>
        <div className="text-md text-muted-foreground font-medium">
          {data?.position && <span> {data?.position} </span>}
        </div>
        <div className="text-sm text-muted-foreground/60 font-medium">
          <span>
            {data?.employedAt &&
              data?.company &&
              t['employedAt']
                .replace('$', data?.company)
                .replace(
                  '$',
                  new Date(data?.employedAt ?? '').getFullYear().toString()
                )}
          </span>
        </div>
        <div className="flex gap-3 items-center text-md text-muted-foreground/60 font-medium">
          <Icons.mail className=" w-5 h-auto"></Icons.mail>
          <span>{data?.email}</span>
        </div>
        {data?.Boss && (
          <div className="flex gap-3 items-center text-md text-muted-foreground/60">
            <span>{t['reportTo']}:</span>
            <Link
              className="hover:text-primary capitalize"
              href={`/dashboard/profile/${data.Boss.id}`}
            >
              {data.Boss.displayName}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
