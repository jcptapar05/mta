import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from "next-auth/jwt"

export async function GET() {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized!' });
  }

  try {
    const address = await prisma.address.findMany({
      include: {
        company: true
      }
    })

    return NextResponse.json({ address })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const {
      billingCompanyName,
      billingCity,
      billingState,
      billingCountry,
      billingPostalCode,
      billingAddressOne,
      billingAddressTwo,
      billingPhoneNumber,
      shippingCompanyName,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingPostalCode,
      shippingAddressOne,
      shippingAddressTwo,
      shippingPhoneNumber,
      userId,
      toggleShippingAddress
    } = await json

    let billingCompanyId = await prisma.company.create({
      data: {
        company: billingCompanyName
      }
    })

    let shippingCompanyId = await prisma.company.create({
      data: {
        company: shippingCompanyName
      }
    })

    let address = await prisma.address.create({
      data: {
        companyId: +billingCompanyId.id || undefined,
        city: billingCity,
        country: billingCountry,
        postal_code: billingPostalCode,
        state: billingState,
        phone_number: +billingPhoneNumber,
        address_1: billingAddressOne,
        address_2: billingAddressTwo,
        userId: Number(userId),
      },
    });

    let sameWithAddress = Boolean(toggleShippingAddress)

    const shippingAddress = await prisma.shippingAddress.create({
      data: {
        companyId: +shippingCompanyId.id || undefined,
        city: sameWithAddress ? billingCity : shippingCity,
        state: sameWithAddress ? billingState : shippingState,
        country: sameWithAddress ? billingCountry : shippingCountry,
        postal_code: sameWithAddress ? billingPostalCode : shippingPostalCode,
        address_1: sameWithAddress ? billingAddressOne : shippingAddressOne,
        address_2: sameWithAddress ? billingAddressTwo : shippingAddressTwo,
        phone_number: sameWithAddress ? +billingPhoneNumber : +shippingPhoneNumber,
        address: { connect: { id: Number(address.id) } },
        userId: users.id,
        same_with_Address: sameWithAddress
      },
    });

    return NextResponse.json({ address, shippingAddress })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
