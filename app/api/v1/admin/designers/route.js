import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from "next-auth/jwt"

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const Bucket = process.env.S3_AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.S3_AWS_REGION,
  credentials: { accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY }
});

export async function GET(req, res) {
  const token = await getToken({ req })

  if (token && token?.role == "super_admin") {
    try {
      const designers = await prisma.designer.findMany()
      return NextResponse.json({ designers })
    } catch (error) {
      return NextResponse.json({ error: 'Not Found!' })
    }
  }
  else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export const POST = async (req, res) => {
  const token = await getToken({ req })

  const formData = await req.formData();

  const avatar = formData.get("avatar");
  const first_name = formData.get("firstname");
  const last_name = formData.get("lastname");
  const company = formData.get("company");

  const blob = await avatar.arrayBuffer()

  const filename = avatar.name

  const params = {
    Bucket,
    Key: filename,
    Body: blob,
  };

  const command = new PutObjectCommand(params);
  const uploaded = await s3.send(command);

  let designer;

  if (uploaded['$metadata'].httpStatusCode) {
    designer = await prisma.designer.create({
      data: {
        first_name, last_name, company, avatar: filename
      },
    });
  }

  return NextResponse.json({ designer });
}

export const revalidate = 0
