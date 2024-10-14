import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/types'
import Link from 'next/link'

interface SeparatorImageProps {
  t: Dictionary
}

export const SeparatorImage: React.FC<SeparatorImageProps> = ({
  t
}: SeparatorImageProps) => {
  return (
    <div className="relative flex justify-center h-96 text-white bg-cover bg-center bg-[url('/images/separation-image.png')]">
      <div className="absolute z-10 w-full h-full rounded-md bg-primary/40 "></div>
      <div className="absolute container z-30 text-center flex h-full flex-col items-center justify-center gap-3 ">
        <p className="text-3xl md:text-5xl font-fredoka">
          {t['strategic-hr-has-never-been-as-important-or-as-easy']}.
        </p>
        <p className="text-lg md:text-2xl font-fredoka">
          {t['pave-the-way-with-software-that-empowers-you-and-your-people']}.
        </p>
        <div className="relative flex justify-center items-center">
          <Link
            href={'/register'}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'z-30 hover:text-primary/70 text-primary shadow-lg'
            )}
          >
            {t['try-it-free']}
          </Link>
        </div>
      </div>
    </div>
  )
}
