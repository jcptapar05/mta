import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req, res) {
  try {
    const products = await prisma.order.aggregate({
      where: {
        status: 'completed'
      },
      _sum: {
        cartTotalPrice: true,
      },
    });

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}

export const revalidate = 0
