import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from 'next-auth/jwt';

export const revalidate = 0

export async function GET(req, res) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized!' });
  }

  try {
    const mostOrdered = await prisma.product.findMany({
      where: {
        total_sold: {
          gt: 0
        }
      },
      orderBy: {
        total_sold: 'desc'
      }
    });

    return NextResponse.json({ mostOrdered })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}


