import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import { render } from "@react-email/render";
import ContactUs from '@/emails/ContactUs';

export async function GET(req, res) {
  try {

    const contacts = await prisma.contactform.findMany()
    return NextResponse.json({ contacts })

  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req) => {

  const json = await req.json();
  const { email, message } = await json

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

    const emailHtml = render(ContactUs({ email: email, message: message }))

    const textFormat = `Hi,

    ${message}

    Best regards,
    MTA Team
    `

    var mailOptions = {
      from: 'My Top Arts <marketing@mytoparts.com>',
      to: [email, 'marketing@mytoparts.com', 'admin@mytoparts.com'],
      subject: 'My Top Arts | Contact Us',
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

    // await prisma.contactform.create({
    //   data: {
    //     email, name, company, contact, message
    //   },
    // });

  } catch (error) {
    console.log(error);
  }
}
