import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const id = params.id

  const address = await prisma.shippingAddress.findMany({
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
      country,
      isSetDefault,
      userId
    } = await json

    await prisma.company.update({
      where: {
        id: Number(companyId)
      },
      data: {
        company
      }
    })

    await prisma.shippingAddress.update({
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
        set_default: Boolean(isSetDefault)
      },
    });

    if (Boolean(isSetDefault)) {
      const shippingAddresses = await prisma.shippingAddress.findMany({
        where: {
          userId,
        },
      })

      for (let i = 0; shippingAddresses?.length > i; i++) {
        if (shippingAddresses[i].id != id) {
          await prisma.shippingAddress.update({
            where: {
              id: +shippingAddresses[i].id
            },
            data: {
              set_default: false
            },
          });
        }
      }
    }

    return NextResponse.json({ message: 'Successfully updated!' })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export async function DELETE(req, { params }) {
  // const token = await getToken({ req })

  // if (token && token?.role == "super_admin") {
  const id = +params.id

  console.log(id);

  await prisma.shippingAddress.delete({
    where: {
      id
    }
  })

  return NextResponse.json({ message: "Successfully deleted!" })
  // }
  //  else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}