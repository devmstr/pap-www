'use client'

import { useState } from 'react'
import faqData from './faq-data.json'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import Fade from '@/components/Fade'
import { Dictionary } from '@/types'

interface NewFacSectionProps {
  t: Dictionary
}

export const NewFacSection: React.FC<NewFacSectionProps> = ({
  t
}: NewFacSectionProps) => {
  const [isActive, setIsActive] = useState(-1)
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h6 className="text-lg text-primary font-medium text-center mb-2">
            {t['title']}
          </h6>
          <h2 className="text-4xl font-manrope text-center font-bold text-foreground leading-[3.25rem]">
            {t['sub-title']}
          </h2>
        </div>
        <div
          className="accordion-group flex flex-col gap-1"
          data-accordion="default-accordion"
        >
          {t.questions.map((faq: any, index: number) => {
            return (
              <div
                key={'faq-' + index}
                className="accordion p-2 transition-all duration-500   accordion-active:bg-primary/20 active"
                id="basic-heading-one-with-arrow"
              >
                <button
                  className="accordion-toggle px-4 pb-6 group inline-flex items-center justify-between leading-8 text-foreground w-full transition duration-500 text-left hover:text-primary accordion-active:font-medium accordion-active:text-primary
                  border-b border-solid border-gray-200 hover:border-primary
                  "
                  aria-controls="basic-collapse-one-with-arrow group"
                  onClick={() => setIsActive(isActive === index ? -1 : index)}
                >
                  <h5>{faq.question}</h5>
                  <Icons.dropdown
                    className={cn(
                      'z-50 w-5 h-5 text-muted-foreground group-hover:text-primary',
                      isActive == index
                        ? 'rotate-180 transition-transform duration-300'
                        : 'rotate-0 transition-transform duration-300'
                    )}
                  />
                </button>
                <div
                  id="basic-collapse-one-with-arrow"
                  className="accordion-content w-full px-0 overflow-hidden max-h-[250px]"
                  aria-labelledby="basic-heading-one-with-arrow"
                >
                  {isActive == index && (
                    <Fade
                      from="top"
                      duration={300}
                      delay={50}
                      easing={'easeInOut'}
                    >
                      <p
                        className={cn(
                          'flex px-4 pt-6 text-base text-muted-foreground leading-6 '
                        )}
                      >
                        {faq.answer}
                      </p>
                    </Fade>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
