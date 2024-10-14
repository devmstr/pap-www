import { HeroSection } from './hero-section'
import { WhatIsPap } from './what-is-pap'
import { OurServices } from './our-services'
import { WebAppSnapshots } from './web-app-snapshots'
import { SeparatorImage } from './separator-image'
import Testimonials from './testimonials'
import FAQ from './faq'
import { NewFacSection } from './new-fac-section'
import { NewTestimonials } from './new-testimonials'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/i18n.config'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: {
      home: {
        separatorImage,
        hero,
        faqs,
        ourServices,
        testimonials,
        webappSnapshots,
        whatsApp
      }
    }
  } = await getDictionary(params.lang)
  return (
    <>
      <div className="flex flex-col gap-20">
        <HeroSection t={hero} />
        <WhatIsPap t={whatsApp} />
        <OurServices t={ourServices} />
        <WebAppSnapshots t={webappSnapshots} />
        <SeparatorImage t={separatorImage} />
        {/* <Testimonials /> */}
        <NewTestimonials t={testimonials} />
        {/* <FAQ /> */}
        <NewFacSection t={faqs} />
      </div>
    </>
  )
}

export default Page
