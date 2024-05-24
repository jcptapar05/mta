import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from "next-auth/jwt"

export async function GET(req, res) {
  const url = new URL(req?.url)
  const status = url?.searchParams?.get("status")

  const token = await getToken({ req })

  // if (token && token?.role == "super_admin" || token?.role == "artist") {
  try {
    const orderDetails = await prisma.orderDetail.findMany({
      where: {
        order: {
          status: status == 'all' ? undefined : status
        },
        userId: token?.role == "artist" || token?.role == 'customer' ? token.id : undefined
      },
      include: {
        order: true,
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            job_title: true
          }
        },
        order: true,
        address: {
          include: {
            company: true
          }
        },
        shipping_address: {
          include: {
            company: true
          }
        }
      }
    })
    return NextResponse.json({ orderDetails })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
  // }
  // else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}
