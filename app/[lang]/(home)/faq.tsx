'use client'
// components/FAQ.tsx
import React, { useState } from 'react'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import faqs from './faq-data.json'

const FAQ: React.FC = () => {
  const [isActive, setIsActive] = useState(-1)

  return (
    <div className="container py-16 flex justify-center ">
      <div className="flex flex-col items-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 font-fredoka text-primary">
          FAQ
        </h1>
        <div className="flex flex-col pt-16  ">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                onClick={() => setIsActive(isActive === index ? -1 : index)}
                className="cursor-pointer flex justify-between items-center"
              >
                <h3 className="text-xl font-semibold font-fredoka text-primary">
                  {faq.question}
                </h3>
                <Icons.dropdown
                  className={cn(
                    'z-50 w-8 h-8 text-primary',
                    isActive == index
                      ? 'rotate-180 transition-transform duration-300'
                      : 'rotate-0 transition-transform duration-300'
                  )}
                />
              </div>
              <p className={cn('mt-2', isActive == index ? 'flex' : 'hidden')}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
