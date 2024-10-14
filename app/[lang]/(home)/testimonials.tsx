'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Icons } from '@/components/icons'
import Image from 'next/image'
import testimonialsData from './testimonials-data.json'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel'
import { AlignCenter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestimonialProps {
  name: string
  position: string
  thought: string
  image: string
}
interface CarouselProps {}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  position,
  thought: text,
  image
}) => {
  return (
    <div className="w-[90%] pt-5 max-w-xl flex flex-col items-center gap-4 ">
      <div
        className={`relative z-20 flex justify-center items-center w-36 h-36  md:w-48 md:h-48`}
      >
        <Image
          className="rounded-full h-full w-full object-cover object-top"
          width={600}
          height={600}
          src={image}
          alt={image}
        />
        {/* background ellipse  */}
        <div className="absolute z-10 w-[10rem] h-36 md:w-[13rem] md:h-48 rounded-full -rotate-[45deg] bg-gray-500/20 " />
      </div>
      <div className="relative z-10 -top-20 flex flex-col gap-5">
        <div className="mx-3 md:mx-0 relative z-30 flex items-center justify-center bg-white p-4 min-h-64 shadow-2xl rounded-tr-[6rem] rounded-bl-[6rem] ">
          <p className="text-[#1e214f] p-4 md:p-8 tex-md md:text-xl font-light font-fredoka">
            {text}
          </p>
        </div>
        <Icons.doubleQuotes className="absolute  text-muted-foreground/20 -top-[2rem]  -left-[1rem] md:-top-[4rem]  md:-left-[4.5rem] w-[3.5rem] h-[3.5rem] md:w-[6rem] md:h-[6rem] z-10 " />
        <Icons.doubleQuotes className="absolute  text-muted-foreground/20  bottom-12 -right-[1.4rem]  md:bottom-7 md:-right-[4.5rem] w-[3.5rem] h-[3.5rem] md:w-[6rem] md:h-[6rem] rotate-180 z-0 " />
        <div className="flex flex-col items-center">
          <p className="font-fredoka text-primary text-3xl">{name}</p>
          <p className="font-fredoka text-primary text-lg">{position}</p>
        </div>
      </div>
    </div>
  )
}

const Testimonials: React.FC = () => {
  return (
    <div className="flex justify-center py-20">
      <Carousel
        className="w-full max-w-[46rem] "
        opts={{
          align: 'start'
        }}
      >
        <CarouselContent className="">
          {testimonialsData.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className={cn(
                index > 0 ? 'ml-[6rem]' : 'ml-[0.7rem]',
                ' md:ml-2  w-full pl-0 flex justify-center'
              )}
            >
              <Testimonial {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}

export default Testimonials
