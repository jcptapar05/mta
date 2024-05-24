
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

import nodemailer from 'nodemailer'
import { render } from "@react-email/render";
import EnterVirtualGallery from '@/emails/EnterVirtualGallery';

export const POST = async (req, res) => {
  try {
    const json = await req.json();
    const { name, email } = await json

    const findUserIfExist = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!findUserIfExist) {
      await prisma.virtualGallery.create({
        data: {
          name,
          email
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API
      }
    });

    const emailHtml = render(EnterVirtualGallery({ email: email, name: name }))

    const textFormat = `Hi,

    Welcome! Delighted to have you here. Explore our site for information and offerings designed just for you. Any questions? Feel free to reach out. Enjoy your visit!

    Best regards,
    MTA Team
    `

    var mailOptions = {
      from: 'My Top Arts <marketing@mytoparts.com>',
      to: [email, 'marketing@mytoparts.com', 'admin@mytoparts.com'],
      subject: 'My Top Arts | Enter Virtual Gallery',
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

    return NextResponse.json({ message: 'Success!' })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}

export const revalidate = 0
