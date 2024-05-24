import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb'
import { v4 as uuidv4 } from 'uuid';

import nodemailer from 'nodemailer'
import { render } from "@react-email/render";
import ForgotPassword from '@/emails/ForgotPassword';

export async function POST(req) {
  const json = await req.json();
  const { email } = await json

  try {
    const pathId = uuidv4()
    const generatedUrl = `${process.env.NEXTAUTH_URL}/reset_password/${pathId}`

    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + 6);

    const findUserIfExist = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!findUserIfExist) {
      return NextResponse.json({ message: "Email is not exist!" })
    }

    const user = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        resetToken: pathId,
        resetTokenExpiry: currentDate
      }
    })

    var transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API
      }
    });

    const emailHtml = render(ForgotPassword({ email: email, generatedUrl }))

    const textFormat = `Hi,

    We have received a request to reset your password. To proceed, please click on the following link:
  
    If you did not initiate this request, please ignore this email.

    Best regards,
    MTA Team
    `

    var mailOptions = {
      from: 'My Top Arts <marketing@mytoparts.com>',
      to: [email, 'marketing@mytoparts.com', 'admin@mytoparts.com'],
      subject: 'My Top Arts | Forgot Password',
      text: textFormat,
      html: emailHtml,
    };

    let responsedInfo;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return responsedInfo = error
      }

      return responsedInfo = info
    });

    return NextResponse.json({ message: "Success!" })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}