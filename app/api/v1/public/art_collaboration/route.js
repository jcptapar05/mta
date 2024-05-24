import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import { render } from "@react-email/render";
import { getToken } from "next-auth/jwt"

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { v4 } from "uuid";
import getAwsFilesBaseUrl from '@/middleware/getAwsFilesBaseUrl';
import ArtCollaborationTemplate from '@/emails/ArtCollaborationTemplate';

const Bucket = process.env.S3_AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.S3_AWS_REGION,
  credentials: { accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY }
});

export const POST = async (req, res) => {
  const token = await getToken({ req })

  try {
    const formData = await req.formData();
    const email = token?.email

    const details = formData.get("details");
    const attachementLen = formData.get("attachementLen");

    const productPhotos = []
    for (let i = 0; Number(attachementLen) > i; i++) {
      let item = formData.get(`product_photo${i}`);

      const blob = await item.arrayBuffer()
      const extname = item.name.split('.').pop();

      const filename = `email/attachments/` + v4() + "." + extname.toLowerCase();
      const params = {
        Bucket,
        Key: filename,
        Body: blob,
        ContentType: item.type
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      productPhotos.push({
        filename,
        path: getAwsFilesBaseUrl(filename)
      })
    }

    if (productPhotos.length > 0) {
      var transporter = nodemailer.createTransport({
        host: 'smtp.resend.com',
        secure: true,
        port: 465,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API
        }
      });


      const emailHtml = render(ArtCollaborationTemplate({ email: email, details }))

      const textFormat = `Hi ,
  
      Calling artists! Showcase your work at our event by uploading your unique pieces. Make your mark and be a part of the creative experience!
  
      Best regards,
      MTA Team
      `

      var mailOptions = {
        from: 'My Top Arts <marketing@mytoparts.com>',
        to: [email, 'marketing@mytoparts.com', 'admin@mytoparts.com'],
        subject: 'My Top Arts | Art Collaboration',
        attachments: productPhotos,
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
    }

    return NextResponse.json({ message: 'success!' })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}