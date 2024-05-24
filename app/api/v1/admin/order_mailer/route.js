import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import { render } from "@react-email/render";
import SendMailToAdmin from '@/emails/SendMailToAdmin';

export const POST = async (req, res) => {

  const json = await req.json();
  const { email, orderId, first_name, message } = await json

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

    const emailHtml = render(SendMailToAdmin({ email: email, orderId: orderId, first_name: first_name, message }))

    const textFormat = `Hi,

    Thank you for your recent order with MTA. We'll get back to you with any assistance you may need regarding order.

    Best regards,
    MTA Team
    `

    var mailOptions = {
      from: 'My Top Arts <marketing@mytoparts.com>',
      to: [email, 'marketing@mytoparts.com', 'admin@mytoparts.com'],
      subject: 'My Top Arts | Order Inquiry',
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
