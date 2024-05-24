import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function GET(req, { params }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized!' });
  }

  const id = params.id

  const address = await prisma.address.findFirst({
    where: {
      userId: Number(id),
    },
    include: {
      company: true
    }
  })

  return NextResponse.json({ address })
}

export async function PATCH(req, { params }) {
  // const token = await getToken({ req })
  const id = await params.id
  const json = await req.json();

  try {
    const {
      company,
      phone,
      city,
      postalCode,
      street,
      companyId,
      addState,
      country
    } = await json

    await prisma.company.update({
      where: {
        id: Number(companyId)
      },
      data: {
        company
      }
    })

    await prisma.address.update({
      where: {
        id: Number(id)
      },
      data: {
        city,
        state: addState,
        country,
        street,
        phone_number: Number(phone),
        postal_code: postalCode,
        address_1: `${street}, ${addState}, ${city}, ZIP Code:
        ${postalCode} ${country}`,
      },
    });

    return NextResponse.json({ message: 'Successfully updated!' })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}