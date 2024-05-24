import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const id = params.id

  const address = await prisma.address.findFirst({
    where: {
      userId: +id,
    },
    include: {
      company: true
    }
  })

  const shippingAddress = await prisma.shippingAddress.findFirst({
    where: {
      userId: +id,
      set_default: true
    },
    include: {
      company: true,
      user: {
        select: {
          first_name: true,
          last_name: true,
        }
      }
    }
  })


  return NextResponse.json({ address, shippingAddress })
}