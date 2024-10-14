import useServerApi from '@/hooks/use-server-side-axios-auth'
import axios from '@/lib/axios'
import { sendCheckInPasswordEmail, sendConfirmationEmail } from '@/lib/mailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as {
    email: string
  }

  const api = await useServerApi()

  try {
    const {
      data: { displayName, password }
    } = await api.get<{ displayName: string; password: string }>(
      `/checking?email=${email}`
    )

    if (!password)
      return NextResponse.json(
        { message: 'No checking password found' },
        { status: 404 }
      )

    const result = await sendCheckInPasswordEmail({
      checkInPassword: password,
      email,
      displayName
    })
    if (result?.success)
      return NextResponse.json(
        { message: 'Your checking password email has been send with success' },
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
