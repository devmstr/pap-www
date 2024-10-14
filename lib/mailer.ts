import { ConfirmEmail } from '@/emails/confirme.email'
import { ResetPassword } from '@/emails/reset-password.email'
import CheckInEmail from '@/emails/checkin.email'
import { render } from '@react-email/components'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

export async function sendConfirmationEmail({
  displayName,
  confirmUrl,
  email
}: {
  displayName: string
  confirmUrl: string
  email: string
}) {
  try {
    const emailHtml = await render(ConfirmEmail({ displayName, confirmUrl }))
    //
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Email Confirmation',
      html: emailHtml
    })
    //
    return {
      success: true,
      email
    }
  } catch (error) {
    console.log(error)
  }
}
export async function sendResetPasswordEmail({
  resetPasswordUrl,
  displayName,
  email
}: {
  resetPasswordUrl: string
  displayName: string
  email: string
}) {
  try {
    const emailHtml = await render(
      ResetPassword({ displayName, resetPasswordUrl })
    )
    //
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Reset Password',
      html: emailHtml
    })
    //
    return {
      success: true,
      email
    }
  } catch (error) {
    console.log(error)
  }
}

export async function sendCheckInPasswordEmail({
  checkInPassword,
  displayName,
  email
}: {
  checkInPassword: string
  displayName: string
  email: string
}) {
  try {
    const emailHtml = await render(
      CheckInEmail({ displayName, checkInPassword })
    )
    //
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Check In Password',
      html: emailHtml
    })
    //
    return {
      success: true,
      email
    }
  } catch (error) {
    console.log(error)
  }
}
