import { Dictionary } from '@/types'
import Image from 'next/image'

interface WebAppSnapshotsProps {
  t: Dictionary
}

export const WebAppSnapshots: React.FC<WebAppSnapshotsProps> = ({
  t
}: WebAppSnapshotsProps) => {
  return (
    <div className="mb-28">
      <div className="container flex flex-col gap-16">
        <div className="flex flex-col-reverse  md:flex-row items-center md:justify-between  gap-7">
          <div className="w-full flex justify-center md:justify-start max-w-md md:max-w-full  gap-3 md:w-3/5">
            <Image
              className=" w-full rounded-lg shadow-lg "
              src="/images/grid-and-mobile-view.svg"
              alt="Image Alt Text"
              width={517}
              height={388}
            />
          </div>
          <div className="w-full flex flex-col items-center md:items-start gap-6 md:w-2/5 md:mb-0 p-4 lg:p-1">
            <h3 className="text-xl text-foreground font-quicksand font-black mb-2 ">
              {t['know-your-people-to-help-them-grow']}
            </h3>
            <p className="max-w-md mb-2 text-foreground  font-quicksand font-bold text-md   ">
              {t['know-your-people-to-help-them-grow-sub-title']}
            </p>
            <p className="max-w-md mb-2 text-foreground/80 text-md ">
              {t['know-your-people-to-help-them-grow-sub-paragraph-1']}
            </p>
            <p className="max-w-md mb-2 text-foreground/80 text-md ">
              {t['know-your-people-to-help-them-grow-sub-paragraph-2']}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:justify-between  gap-7">
          <div className="w-full flex flex-col items-center md:items-start gap-6 md:w-2/5 md:mb-0 p-4 lg:p-1">
            <h3 className="text-xl text-foreground font-quicksand font-black mb-2 ">
              {t['detailed-annual-reports-about-you-company']}
            </h3>
            <p className="max-w-md mb-2 text-foreground  font-quicksand font-bold text-md  ">
              {t['detailed-annual-reports-about-you-company-sub-title']}
            </p>
            <p className="max-w-md mb-2 text-foreground/80 text-md ">
              {t['detailed-annual-reports-about-you-company-sub-paragraph-1']}
            </p>
            <p className="max-w-md mb-2 text-foreground/80 text-md ">
              {t['detailed-annual-reports-about-you-company-sub-paragraph-2']}
            </p>
          </div>
          <div className="w-full flex justify-center md:justify-start max-w-md md:max-w-full  gap-3 md:w-3/5">
            <Image
              className=" w-full rounded-lg shadow-lg "
              src="/images/annul-reports-simple.jpg"
              alt="Image Alt Text"
              width={517}
              height={388}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-5">
          <div className="w-full flex justify-around max-w-md md:max-w-full gap-4 md:w-2/5">
            <Image
              className="h-[30rem] w-auto rounded-lg shadow-lg"
              src="/images/mobile-assessment-view.svg"
              alt="Image Alt Text"
              width={517}
              height={388}
            />
            <Image
              className="h-[30rem] w-auto rounded-lg shadow-lg"
              src="/images/mobile-potential-view.svg"
              alt="Image Alt Text"
              width={517}
              height={388}
            />
          </div>
          <div className="w-full flex flex-col items-center md:items-start gap-6 md:w-3/5 md:mb-0 p-4 lg:p-1">
            <h3 className="text-xl text-foreground font-quicksand font-black mb-2 ">
              {t['intuitive-human-resource-management-at-your-fingertips']}
            </h3>
            <p className="max-w-md mb-2 text-foreground  font-quicksand font-bold text-md   ">
              {
                t[
                  'intuitive-human-resource-management-at-your-fingertips-sub-title'
                ]
              }
            </p>
            <p className="max-w-md mb-2 text-foreground/80 text-md ">
              {
                t[
                  'intuitive-human-resource-management-at-your-fingertips-sub-paragraph'
                ]
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
