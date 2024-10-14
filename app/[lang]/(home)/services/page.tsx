import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import Image from 'next/image'

interface PageProps {
  params: { lang: Locale }
}

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const {
    pages: { services: t }
  } = await getDictionary(params.lang)
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-20 overflow-x-hidden">
      <div className="container max-w-full justify-center items-center">
        <div className="text-center my-10">
          <h1 className="font-fredoka text-primary text-5xl mb-4">
            {t['title']}
          </h1>
          <h2 className="font-fredoka text-gray-500 text-lg mb-4">
            {t['sub-title']}!
          </h2>
          <div className="p-4">
            <Image
              src="/images/solutions1.svg"
              alt="About 1"
              className="mx-auto"
              width={450}
              height={450}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
          <div className="">
            <Image
              src="/images/s1.svg"
              className="mb-2"
              width={30}
              height={30}
              alt="Solutions Icon"
            />
            <h2 className="font-fredoka text-black text-lg mb-4">
              {t['swift-precision-hiring-for-company-needs']}.
            </h2>
            <p>
              {t['swift-precision-hiring-for-company-needs-sub-paragraph-1']}.
            </p>
            <p>
              {t['swift-precision-hiring-for-company-needs-sub-paragraph-2']}.
            </p>
          </div>
          <div className="">
            <Image
              src="/images/s2.svg"
              className="mb-2"
              width={30}
              height={30}
              alt="Solutions Icon"
            />
            <h2 className="font-fredoka text-black text-lg mb-4">
              {t['strategic-employee-succession-blueprint']}.
            </h2>
            <p>
              {t['strategic-employee-succession-blueprint-sub-paragraph-1']}.
            </p>
            <p>
              {t['strategic-employee-succession-blueprint-sub-paragraph-2']}.
            </p>
          </div>
          <div className="">
            <Image
              src="/images/s3.svg"
              className="mb-2"
              width={30}
              height={30}
              alt="Solutions Icon"
            />
            <h2 className="font-fredoka text-black text-lg mb-4">
              {t['effortless-performance-goal-management-solution']}.
            </h2>
            <p>
              {
                t[
                  'effortless-performance-goal-management-solution-sub-paragraph-1'
                ]
              }
              .
            </p>
            <p>
              {
                t[
                  'effortless-performance-goal-management-solution-sub-paragraph-2'
                ]
              }
              .
            </p>
          </div>
          <div className="">
            <Image
              src="/images/s4.svg"
              className="mb-2"
              width={30}
              height={30}
              alt="Solutions Icon"
            />
            <h2 className="font-fredoka text-black text-lg mb-4">
              {t['performance-excellence-assessment']}.
            </h2>
            <p>{t['performance-excellence-assessment-sub-paragraph-1']}.</p>
            <p>{t['performance-excellence-assessment-sub-paragraph-2']}.</p>
          </div>
          <div className="">
            <Image
              src="/images/s5.svg"
              className="mb-2 w-8 h-8"
              width={30}
              height={20}
              alt="Solutions Icon"
            />
            <h2 className="font-fredoka text-black text-lg mb-4">
              {t['competency-evaluation-excellence-hub']}.
            </h2>
            <p>{t['competency-evaluation-excellence-hub-sub-paragraph-1']}.</p>
            <p>O{t['competency-evaluation-excellence-hub-sub-paragraph-2']}.</p>
          </div>
          <div className="">
            <Image
              src="/images/s6.svg"
              className="mb-2"
              width={30}
              height={30}
              alt="Solutions Icon"
            />
            <h2 className="font-fredoka text-black text-lg mb-4">
              {t['soft-skill-mastery-spider-visualization']}.
            </h2>
            <p>
              {t['soft-skill-mastery-spider-visualization-sub-paragraph-1']}.
            </p>
            <p>
              {t['soft-skill-mastery-spider-visualization-sub-paragraph-2']}.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
