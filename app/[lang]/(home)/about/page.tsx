import { Icons } from '@/components/icons'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import Image from 'next/image'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: { aboutUs: t }
  } = await getDictionary(params.lang)
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 ">
      <div className="container py-24 ">
        <div className="text-center">
          <h1 className="font-fredoka text-primary text-5xl mb-4">
            {t['title']}?
          </h1>
          <h2
            className="font-fredoka text-muted-foreground
           text-2xl mb-4"
          >
            {t['sub-title']}
          </h2>
        </div>
        {/* Section 1 */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 items-center justify-center my-8">
          <div className="flex-1  md:p-4">
            <h2 className="font-fredoka text-primary text-3xl mb-4">
              {t['who-we-are']}?
            </h2>
            <p>
              {t['who-we-are-sub-paragraph-1']} <br />{' '}
              {t['who-we-are-sub-paragraph-2']} <br />{' '}
              {t['who-we-are-sub-paragraph-3']} <br />{' '}
              {t['who-we-are-sub-paragraph-4']}
            </p>
          </div>
          <div className="flex flex-col flex-1   items-center justify-center gap-5 my-16">
            <Icons.logo className="h-9 w-auto" />
            <Icons.logoText className="h-9 w-auto" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col lg:flex-row items-center gap-4 justify-center my-8">
          <div className="flex-1 p-4">
            <Image
              src="/images/about2.svg"
              alt="About 2"
              width={384}
              height={384}
              className=""
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 md:p-4">
            <h2 className="font-fredoka text-primary text-3xl ">
              {t['values-and-principals']}
            </h2>
            <ol>
              <li>
                <strong className="font-fredoka text-primary">
                  &#8226; {t['innovation']}:{' '}
                </strong>
                {t['innovation-sub-paragraph']}
              </li>
              <li>
                <strong className="font-fredoka text-primary">
                  &#8226; {t['integrity']}:{' '}
                </strong>
                {t['integrity-sub-paragraph']}
              </li>
              <li>
                <strong className="font-fredoka text-primary">
                  &#8226; {t['collaboration']}:{' '}
                </strong>
                {t['collaboration-sub-paragraph']}
              </li>
              <li>
                <strong className="font-fredoka text-primary">
                  &#8226; {t['customer-centric']}:{' '}
                </strong>
                {t['customer-centric-sub-paragraph']}
              </li>
              <li>
                <strong className="font-fredoka text-primary">
                  &#8226; {t['security-and-privacy']}:{' '}
                </strong>
                {t['security-and-privacy-sub-paragraph']}
              </li>
              <li>
                <strong className="font-fredoka text-primary">
                  &#8226; {t['continuous-learning']}:{' '}
                </strong>
                {t['continuous-learning-sub-paragraph']}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
