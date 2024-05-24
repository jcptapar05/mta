import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const address = await prisma.shippingAddress.findMany({
      include: {
        company: true
      }
    })

    return NextResponse.json({ address })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req, res) => {
  try {
    const json = await req.json();
    const {
      company,
      phone,
      country,
      addState,
      city,
      postalCode,
      street,
      userId
    } = await json

    let shippingCompanyId = await prisma.company.create({
      data: {
        company: company
      }
    })

    await prisma.shippingAddress.create({
      data: {
        companyId: +shippingCompanyId.id || undefined,
        city,
        state: addState,
        country,
        postal_code: postalCode,
        street,
        phone_number: Number(phone),
        address_1: `${street}, ${addState}, ${city}, ZIP Code:
        ${postalCode} ${country}`,
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Successfully created!" })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
