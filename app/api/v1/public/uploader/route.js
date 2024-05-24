import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { v4 } from "uuid";

const Bucket = process.env.S3_AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.S3_AWS_REGION,
  credentials: { accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY }
});

export const POST = async (req, res) => {
  const formData = await req.formData();
  const avatar = formData.get("avatar");
  const blob = await avatar.arrayBuffer()

  const extname = avatar.name.split('.').pop();
  const avatarname = 'artist/avatar/' + v4() + "." + extname.toLowerCase()

  const params = {
    Bucket,
    Key: avatarname,
    Body: blob,
  };

  const command = new PutObjectCommand(params);
  const uploaded = await s3.send(command);

  if (uploaded) {
    return NextResponse.json({ success: 'Successfully Uploaded!', avatarname })
  }
}