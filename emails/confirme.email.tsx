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

interface ConfirmEmailProps {
  displayName?: string
  confirmUrl?: string
}

export const ConfirmEmail = ({
  displayName,
  confirmUrl
}: ConfirmEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>PrefectAssessPro</Preview>
      <Tailwind>
        <Body className="bg-[#f4f4f4] py-2 ">
          <Container className="bg-white border border-[#f0f0f0] p-12 shadow-lg">
            <Img
              src={
                'https://perfectassesspro.com/images/logo.png'
              }
              style={{ width: 40, height: 'auto' }}
              width="40"
              height="33"
              alt="logo"
              title="logo"
            />
            <Section>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                Hi {displayName},
              </Text>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                Welcome aboard! We are thrilled to have you join the Perfect
                Assess Pro team, where we empower your people and perfect your
                performance.
              </Text>
              <Text className="text-[16px] font-light text-[#404040] leading-[26px] font-sans">
                To activate your account and unlock full access, simply click
                the confirm button below.
              </Text>
              <Button
                className="bg-[#08aefe] rounded text-white text-base no-underline text-center py-3 px-6 font-sans"
                href={confirmUrl}
              >
                Confirm Email
              </Button>
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

ConfirmEmail.PreviewProps = {
  confirmUrl: '#',
  displayName: 'Mohamed Ismail'
} as ConfirmEmailProps

export default ConfirmEmail
