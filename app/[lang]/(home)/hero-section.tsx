import { Icons } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/types'

interface HeroSectionProps {
  t: Dictionary
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t
}: HeroSectionProps) => {
  return (
    <>
      <div className="relative w-full flex justify-center">
        <div className="absolute inset-0 bg-primary opacity-40"></div>
        <div className="container absolute flex flex-col md:flex-row h-full w-full gap-4 md:justify-around">
          {/* hero text */}
          <div className="flex h-3/4 order-2 md:order-1 flex-col gap-4  md:justify-center justify-start items-start  md:h-[80%]">
            <h1 className="text-6xl md:text-7xl font-fredoka font-bold max-w-xl text-white text-shadow-sm">
              {t["don't-just-keep-up-get-ahead"]}
            </h1>
            <p className="max-w-xl text-white text-xl font-quicksand font-medium ">
              {
                t[
                  'tired-of-operating-in-the-dark-when-it-comes-to-your-human-capitaltired-of-operating-in-the-dark-when-it-comes-to-your-human-capital'
                ]
              }
              .
            </p>
            <p className="max-w-xl text-white text-xl font-quicksand font-medium text-shadow">
              {t['imagine-having-a-crystal-clear-view-of-your-employees']}.
            </p>
            <Button
              variant={'outline'}
              className=" text-primary hover:text-primary/70 text-[1.1rem]  h-12 px-3 py-2"
            >
              {t['try-it-free']}
            </Button>
          </div>
          {/* play button  */}
          <div className="relative order-1 md:order-2 flex h-1/4 flex-1  md:h-[80%] justify-center items-center scale-90 md:scale-100">
            <div className="pl-28 md:p-0 flex gap-4">
              <button
                className={cn('flex', buttonVariants({ variant: 'outline' }))}
              >
                <div className="absolute z-40 flex justify-center items-center">
                  <Icons.triangle className="relative left-1 w-14 h-14 text-primary/80" />
                </div>

                <div className="absolute z-30 w-24 h-24 bg-white rounded-full "></div>
                <div className="absolute z-20 w-[7.2rem] h-[7.2rem] bg-white/20 rounded-full"></div>
                <div
                  className="absolute z-10
w-[8rem] h-[8rem] bg-white/10 rounded-full"
                ></div>
              </button>
              <span className="relative flex items-center left-8  text-lg  font-medium font-quicksand text-white/80">
                {t['see-promotion']} <br /> {t['video']}
              </span>
            </div>
          </div>
        </div>
        <div className="header h-[90vh] lg:h-[85vh] w-full flex flex-col justify-end  bg-cover bg-bottom">
          <div className="">
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(255,255,255,0.7"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(255,255,255,0.5)"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(255,255,255,0.3)"
                />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
