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

interface ResetPasswordProps {
  displayName?: string
  resetPasswordUrl?: string
}

export const ResetPassword = ({
  displayName,
  resetPasswordUrl
}: ResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>PrefectAssessPro</Preview>
      <Tailwind>
        <Body className="bg-[#f4f4f4] py-2 ">
          <Container className="bg-white border border-[#f0f0f0] p-12 shadow-lg">
            <Img
              src={'https://perfectassesspro.com/images/logo.png'}
              width="40"
              height="33"
              className="w-10 h-auto"
              alt="pap-logo"
            />
            <Section>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                Trouble signing in? {displayName},
              </Text>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                Resetting your password is a breeze. Simply click the button
                below and follow the instructions. We&apos;ll get you back up
                and running in no time.
              </Text>
              <Button
                className="bg-[#08aefe] rounded text-white text-base no-underline text-center py-3 px-6 font-sans"
                href={resetPasswordUrl}
              >
                Reset Password
              </Button>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                If you have any questions, just reply to this email we&apos;re
                always happy to help out.
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

ResetPassword.PreviewProps = {
  displayName: 'Mohamed Ismail',
  resetPasswordUrl: '#'
} as ResetPasswordProps

export default ResetPassword
