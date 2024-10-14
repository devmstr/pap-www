import { Icons } from '@/components/icons'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

interface CheckInEmailProps {
  displayName?: string
  checkInPassword?: string
}

export const CheckInEmail = ({
  displayName,
  checkInPassword
}: CheckInEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>PrefectAssessPro</Preview>
      <Tailwind>
        <Body className="bg-[#f4f4f4] py-2 ">
          <Container className="bg-white border border-[#f0f0f0] p-12 shadow-lg">
            <Img
              src={'https://perfectassesspro.com/images/logo.png'}
              className="w-10 h-auto"
              width="40"
              height="33"
              alt="pap-logo"
            />
            <Section>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                Hi {displayName},
              </Text>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                Welcome to PerfectAssessPro! You have been invited by your
                company's HR team, and your account is now ready. To access the
                platform and start using all its features, please log in with
                your email and the password provided below.
              </Text>
              <Section
                className={
                  'relative font-medium bg-gray-100 text-gray-600 rounded-md mb-8 p-5 '
                }
              >
                <Text className={'text-3xl text-center align-middle'}>
                  {checkInPassword}
                </Text>
              </Section>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>

              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                Cheers,
                <br />
                PAP Team.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

CheckInEmail.PreviewProps = {
  checkInPassword: 'DJZ-TLX',
  displayName: 'Mohamed Ismail'
} as CheckInEmailProps

export default CheckInEmail
