import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req, res) {
  try {
    const products = await prisma.product.aggregate({
      _sum: {
        total_sold: true,
      },
    });

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}

export const revalidate = 0
