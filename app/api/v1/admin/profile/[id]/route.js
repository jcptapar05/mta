import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';
import { getToken } from "next-auth/jwt"

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

export async function GET(req, { params }) {
  const token = await getToken({ req })
  const id = params.id

  if (token.id != +id) return NextResponse.json({ error: 'Not Found!' })

  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
    include: {
      address: true
    }
  })

  const userData = exclude(user, ['password'])

  return NextResponse.json({ user: userData })
}

export async function PATCH(req, { params }) {
  const token = await getToken({ req })
  const id = await params.id
  const json = await req.json();

  const { firstName,
    lastname,
    jobTitle,
    email,
    businessType,
    websiteUrl } = await json

  if (token) {
    const user = await prisma.user.update({
      where: {
        id: +id
      },
      data: {
        email: email,
        first_name: firstName,
        last_name: lastname,
        job_title: jobTitle,
        website_url: websiteUrl,
        business_type: businessType
      }
    })

    return NextResponse.json({ user })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}