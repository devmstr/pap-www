import { ContactUsForm } from '@/components/contact-us-form'
import { Icons } from '@/components/icons'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import Image from 'next/image'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: { contactUs: t }
  } = await getDictionary(params.lang)
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 ">
      <div className="container pt-14 pb-20 flex flex-col gap-7 ">
        <div className="text-center flex flex-col items-center">
          <h1 className="font-fredoka text-primary text-5xl mb-4">
            {t['title']}
          </h1>
          <h2 className="font-fredoka text-gray-400 text-xl font-light mb-4">
            {t['sub-title']}
          </h2>
          <Image
            src="/images/contact.svg"
            alt="Contact 2"
            width={400}
            height={400}
            className="pt-12"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="max-w-lg flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-5 ">
              <div className="max-w-xs flex-1 self-start">
                <Icons.info className="text-white bg-primary w-12 h-12 p-2.5 rounded" />
                <h3 className="font-fredoka text-gray-950 text-lg my-4">
                  {t['technical-and-account-support']}
                </h3>
                <p className="font-fredoka text-gray-400 text-sm font-light leading-5">
                  {t['technical-and-account-support-sub-title']}
                </p>
              </div>
              <div className="max-w-xs flex-1 self-start">
                <Icons.mail className="text-white bg-primary w-12 h-12 p-2.5 rounded" />
                <h3 className="font-fredoka text-gray-950 text-lg my-4">
                  {t['contact-information']}
                </h3>
                <p className="font-fredoka text-gray-400 text-sm font-light leading-5">
                  {t['contact-information-sub-title']}{' '}
                  <a
                    href="mailto:support-team@pap.com"
                    className="text-primary"
                  >
                    support-team@pap.com
                  </a>
                  <br />
                  {t['or-call']}{' '}
                  <a href="tel:+213658769361" className="text-primary">
                    +213-658-769-361
                  </a>
                </p>
              </div>
            </div>
            <ContactUsForm t={t.form} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
