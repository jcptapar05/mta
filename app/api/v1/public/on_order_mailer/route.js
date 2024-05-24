import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import { render } from "@react-email/render";
import OrderEmail from '@/emails/OrderEmail'

export async function GET(req, res) {
  try {

    const contacts = await prisma.contactform.findMany()
    return NextResponse.json({ contacts })

  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req, res) => {

  const json = await req.json();
  const { first_name, email } = await json

  try {
    var transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API
      }
    });

    const emailHtml = render(OrderEmail({ email: email, first_name }))

    const textFormat = `Hi,

    Thank you for your purchase! Your support means the world to us. If you have any questions or need assistance, please don't hesitate to reach out. We're here to help and appreciate your business!

    Best regards,
    MTA Team
    `

    var mailOptions = {
      from: 'My Top Arts <marketing@mytoparts.com>',
      to: [email, 'marketing@mytoparts.com', 'admin@mytoparts.com'],
      subject: 'My Top Arts | Order',
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

    return NextResponse.json({ responsedInfo, message: 'Successfully sent!' })
  } catch (error) {
    console.log(error);
  }
}
