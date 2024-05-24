import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import { render } from "@react-email/render";
import NewsLetter from '@/emails/NewsLetter';

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
  const { email } = await json

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

    const emailHtml = render(NewsLetter({ email: email }))

    const textFormat = `Hi,

    Thank you for subscribing to our newsletter! We're excited to have you on board. Stay tuned for the latest updates, news, and special offers. Welcome to our community!

    Best regards,
    MTA Team
    `

    var mailOptions = {
      from: 'My Top Arts <marketing@mytoparts.com>',
      to: [email, 'marketing@mytoparts.com', 'admin@mytoparts.com'],
      subject: 'My Top Arts | Newsletter',
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
