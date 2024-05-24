import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from "next-auth/jwt"
import { v4 } from "uuid";

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
  // const token = await getToken({ req })

  // if (token && token?.role == "super_admin") {
  try {
    const artists = await prisma.artist.findMany()

    return NextResponse.json({ artists })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
  // }
  // else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}

export const POST = async (req, res) => {
  const token = await getToken({ req })

  if (token && (token?.role == "super_admin" || token?.role == "admin")) {
    try {
      const formData = await req.formData();

      const avatar = formData.get("avatar");
      const first_name = formData.get("first_name");
      const last_name = formData.get("last_name");
      const company = formData.get("company");
      const bio = formData.get("bio");
      const email = formData.get("email");
      const address = formData.get("address");
      const facebook_link = formData.get("facebook_link");
      const linkedin_link = formData.get("linkedIn_link");
      const instagram_link = formData.get("instagram_link");
      const portfolio_link = formData.get("portfolio_link");
      const website_link = formData.get("website_link");

      const findUserIfExist = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      const findArtistIfExist = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (findUserIfExist || findArtistIfExist) return NextResponse.json({ message: "Email is exist!" })

      const blob = await avatar.arrayBuffer()

      const extname = avatar.name.split('.').pop();
      const filename = 'artist/avatar/' + v4() + "." + extname.toLowerCase();

      const params = {
        Bucket,
        Key: filename,
        Body: blob,
      };

      const command = new PutObjectCommand(params);
      const uploaded = await s3.send(command);

      let socialMediaId;
      let artist;
      let user;

      if (uploaded['$metadata'].httpStatusCode) {
        socialMediaId = await prisma.socialMedia.create({
          data: {
            facebook_link,
            linkedin_link,
            instagram_link,
            portfolio_link,
            website_link,
          }
        })

        artist = await prisma.artist.create({
          data: {
            first_name,
            last_name,
            company,
            avatar: filename,
            address,
            email,
            bio,
            socialMediaId: socialMediaId.id,
            full_name: first_name + " " + last_name
          },
        });

        user = await prisma.user.create({
          data: {
            first_name,
            last_name,
            email,
            password: '$2b$10$/E9shjK.I4Oqtlg75NPEcOVBp6Bquyea.VkwRxbTP7R0qpN.f.gsW',
            roleId: 4,
            job_title: "Artist",
          }
        })


        let billingCompanyId = await prisma.company.create({
          data: {
            company: ""
          }
        })

        let shippingCompanyId = await prisma.company.create({
          data: {
            company: ""
          }
        })

        let userAddressId = await prisma.address.create({
          data: {
            companyId: Number(billingCompanyId.id),
            city: "",
            country: "",
            postal_code: "",
            state: "",
            phone_number: Number(0),
            address_1: "",
            address_2: "",
            userId: Number(user.id),
          },
        });

        await prisma.shippingAddress.create({
          data: {
            companyId: Number(shippingCompanyId.id),
            city: "",
            state: "",
            country: "",
            postal_code: "",
            address_1: "",
            address_2: "",
            phone_number: 0,
            address: { connect: { id: Number(userAddressId.id) } },
            userId: Number(user.id),
            same_with_Address: true
          },
        });
      }

      return NextResponse.json({ message: 'Success!' })
    } catch (error) {
      return NextResponse.json({ error: 'Not Found!' })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export const revalidate = 0
