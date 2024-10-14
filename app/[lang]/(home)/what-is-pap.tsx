'use client'

import { Dictionary } from '@/types'
import Image from 'next/image'

interface WhatIsPapProps {
  t: Dictionary
}

export const WhatIsPap: React.FC<WhatIsPapProps> = ({ t }: WhatIsPapProps) => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between  gap-7">
        <div className="w-full flex flex-col gap-6 md:w-2/5 mb-4 md:mb-0">
          <h1 className="text-5xl text-primary font-fredoka font-bold mb-2 ">
            {t['title']}
          </h1>
          <p className="mb-2 text-foreground/80 text-md  ">
            {t['sub-paragraph-1']}
          </p>
          <p className="mb-2 text-foreground/80 text-md ">
            {t['sub-paragraph-2']}
          </p>
          <p className="mb-2 text-foreground/80 text-md ">
            {t['sub-paragraph-3']}
          </p>
          <p className="mb-2 text-foreground/80 text-md ">
            {t['sub-paragraph-4']}
          </p>
        </div>
        <div className="w-full p-1  sm:p-12 lg:p-14 xl:p-16 md:w-3/5">
          <Image
            className="w-full rounded-lg shadow-lg rotate-3 "
            src="/images/what-is-pap-img.svg"
            alt="Image Alt Text"
            width={517}
            height={388}
          />
        </div>
      </div>
    </div>
  )
}
