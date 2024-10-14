import axios from '@/lib/axios'
import { sendResetPasswordEmail } from '@/lib/mailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, lang } = (await req.json()) as {
    email: string
    lang?: string
  }

  try {
    const { data } = await axios.get<{ token: string; displayName: string }>(
      `/email?email=${email}`
    )
    if (!data)
      return NextResponse.json(
        { message: 'No user assigned with this email' },
        { status: 404 }
      )
    const result = await sendResetPasswordEmail({
      resetPasswordUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${
        lang || 'en'
      }/reset?email=${email}&token=${data.token}`,
      email,
      displayName: data.displayName
    })
    if (result?.success)
      return NextResponse.json(
        { message: 'You reset password email is send successfully' },
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
