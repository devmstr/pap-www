import { Icons } from '@/components/icons'
import { Dictionary } from '@/types'

interface OurServicesProps {
  t: Dictionary
}

export const OurServices: React.FC<OurServicesProps> = ({
  t
}: OurServicesProps) => {
  return (
    <div
      id="services"
      className="bg-gradient-to-b from-white to-gradient-gray/50 py-20"
    >
      <div className="container w-full flex flex-col gap-14  my-4  ">
        <h1 className="font-fredoka flex font-bold text-primary text-5xl w-full justify-center">
          {t['title']}
        </h1>
        <div className="py-5 flex flex-col md:flex-row gap-11 md:gap-6 lg:gap-8  w-full items-center  md:items-start md:justify-between ">
          <div className="flex flex-col gap-3 max-w-sm">
            <Icons.peopleGroup className="w-9 h-auto text-primary fill-current" />
            <h3 className="text-foreground text-md font-quicksand font-bold">
              {t['manage-you-human-capitale-effectively']}
            </h3>
            <p className="text-foreground/80 font-quicksand text-sm">
              {t['manage-you-human-capitale-effectively-sub-paragraph']}
            </p>
          </div>
          <div className="flex flex-col gap-3 max-w-sm">
            <Icons.personalGrowth className="w-9 h-auto text-primary fill-current" />
            <h3 className="text-foreground text-md font-quicksand font-bold">
              {t['empower-people-and-professional-growth']}
            </h3>
            <p className="text-foreground/80 font-quicksand text-sm">
              {t['empower-people-and-professional-growth-sub-paragraph']}
            </p>
          </div>
          <div className="flex flex-col gap-3 max-w-sm">
            <Icons.fileDown className="w-9 h-auto text-primary" />
            <h3 className="text-foreground text-md font-quicksand font-bold">
              {t['professional-detailed-annual-reports']}
            </h3>
            <p className="text-foreground/80 font-quicksand text-sm">
              {t['professional-detailed-annual-reports-sub-paragraph']}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
