import { sendConfirmationEmail } from '@/lib/mailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, displayName, token } = (await req.json()) as {
    email: string
    displayName: string
    token: string
  }

  try {
    const result = await sendConfirmationEmail({
      confirmUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/email/confirm?email=${email}`,
      email,
      displayName
    })
    if (result?.success)
      return NextResponse.json(
        { message: 'You confirmation email is send successfully' },
        { status: 200 }
      )
    return NextResponse.json(
      { error: "Sorry we can't send you email" },
      { status: 500 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
