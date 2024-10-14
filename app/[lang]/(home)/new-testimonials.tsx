'use client'
import { Icons } from '@/components/icons'
import './testimonials'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import data from './testimonials-data.json'
import Image from 'next/image'
import { Dictionary } from '@/types'

interface NewTestimonialsProps {
  t: Dictionary
}

export const NewTestimonials: React.FC<NewTestimonialsProps> = ({
  t
}: NewTestimonialsProps) => {
  return (
    <section className="container py-16 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: 'start'
          }}
        >
          <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
            <div className="w-full lg:w-2/5">
              <span className="text-2xl text-gray-300 font-medium mb-4 block">
                {t['title']}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-8">
                {t['3k-customers-gave-their']}{' '}
                <span className=" text-transparent bg-clip-text bg-gradient-to-tr from-primary to-primary/70">
                  {t['feedback']}
                </span>
              </h2>
              {/* <!-- Slider controls --> */}
              <div className="relative flex items-center justify-center lg:justify-start gap-5">
                <CarouselPrevious className="relative h-12 w-12 border border-solid border-primary transition-all duration-500 rounded-lg hover:bg-primary text-primary inset-0 hover:text-white translate-0 " />
                <CarouselNext className="relative h-12 w-12 border border-solid border-primary transition-all duration-500 rounded-lg hover:bg-primary text-primary inset-0 hover:text-white translate-0 " />
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              {/* <!--Slider wrapper--> */}

              <CarouselContent className="">
                {data.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className={cn('flex justify-center')}
                  >
                    <div className="group bg-white border border-solid border-gray-200 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-6 transition-all duration-500 hover:border-primary">
                      <div className="flex items-center gap-4 mb-5 sm:mb-9">
                        <Image
                          width={55}
                          height={55}
                          src={testimonial.image}
                          alt="avatar"
                        />
                        <div className="grid gap-1">
                          <h5 className="text-gray-900 font-medium transition-all duration-500  ">
                            {testimonial.name}
                          </h5>
                          <span className="text-sm leading-6 text-gray-500">
                            {testimonial.position}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-5 sm:mb-9 gap-2 transition-all duration-500">
                        {Array.from({ length: 4 }, (_, i) => i).map((i, indx) =>
                          i < testimonial.rating ? (
                            <Icons.star
                              key={'start-' + indx}
                              className="w-4 h-4 text-amber-500"
                            />
                          ) : (
                            <Icons.star
                              key={'start-' + indx}
                              className="w-4 h-4 text-gray-200"
                            />
                          )
                        )}
                      </div>

                      <p className="text-sm text-gray-500 leading-6 transition-all duration-500 min-h-24  group-hover:text-gray-800">
                        {testimonial.thought}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
