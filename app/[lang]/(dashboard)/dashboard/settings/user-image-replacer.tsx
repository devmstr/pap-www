'use client'
import { Icons } from '@/components/icons'
import { DEFAULT_PFP_IMG_PATH } from '@/config/globals'
import useClientApi from '@/hooks/use-axios-auth'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Img from 'next/image'
import { Dictionary } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

interface UserImageReplacerProps {
  t?: Dictionary
  imageUrl: string
}

export const UserImageReplacer: React.FC<UserImageReplacerProps> = ({
  t,
  imageUrl
}: UserImageReplacerProps) => {
  const { data: session, update } = useSession()
  const [isAvatarLoading, setIsAvatarLoading] = useState(false)

  const api = useClientApi()
  const router = useRouter()

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(imageUrl)

  const onDropCallback = async (acceptedFiles: Array<File>) => {
    try {
      if (!session || !acceptedFiles[0]) return

      const file = new FileReader()
      // set preview
      file.onload = () => setPreview(file.result)

      file.readAsDataURL(acceptedFiles[0])

      const formData = new FormData()

      formData.append('image', acceptedFiles[0])

      // upload the image to server
      const { data } = await api.post<{ path: string }>(
        '/upload/pfp',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      // update user image
      session.user.image = data.path
      await update(session)
    } catch (error) {
      console.info(error)
    }
  }
  const onDrop = useCallback(onDropCallback, [session, update, setPreview])

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  })

  return (
    <>
      <div className="h-[2px] w-full px-5 bg-muted/70 " />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col gap-2 full md:w-1/5">
            <span className=" text-sm items-center font-semibold font-inter text-foreground whitespace-nowrap">
              {t['profile-picture']}
            </span>
            <p className="text-sm text-muted-foreground/70 md:max-w-48">
              {t['this-picture-will-be-displayed-on-your-profile']}
            </p>
          </div>

          <div className="flex justify-between  w-full md:w-4/5 max-w-xl  ">
            <div className="flex items-center justify-center">
              {isAvatarLoading ? (
                <Skeleton
                  className={cn(
                    'w-14 h-14 bg-gray-100 rounded-full',
                    isAvatarLoading ? 'hidden' : 'flex'
                  )}
                />
              ) : (
                <div className="h-auto">
                  <div className="flex justify-start xl:justify-center items-center">
                    <div className="relative w-16  h-16 bg-gray-200 rounded-full border-[4px] border-gray-200 hover:border-primary/70    transition-all duration-700  ">
                      <div
                        className="relative  flex justify-center items-center w-full h-full group cursor-pointer "
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <Img
                          width={300}
                          height={300}
                          className="w-ful  h-full object-cover object-center rounded-full "
                          src={
                            (preview as string) ||
                            (session?.user.image as string)
                          }
                          alt="pfp-image"
                          priority
                        />
                        <Icons.upload className="absolute  w-8 h-auto text-primary opacity-0 group-hover:opacity-90 transition-opacity duration-700 " />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="flex">
                    <Button
                        variant={'link'}
                        className="text-muted-foreground/50 hover:text-destructive px-2 hover:no-underline "
                        >
                        Delete
                    </Button>
                    <Button
                        variant={'link'}
                        className="text-muted-foreground/50 hover:text-primary  px-2 hover:no-underline "
                        >
                        Upload
                    </Button>
                </div> 
            */}
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full px-5 bg-muted/70 " />
    </>
  )
}
