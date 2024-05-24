import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export const GET = async (req, res) => {
  const url = new URL(req?.url)

  const currentId = url?.searchParams?.get("currentId")
  const stylesParams = url?.searchParams?.get("styles")
  let products;

  try {
    products = await prisma.product.findMany({
      take: 3,
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
      where: {
        active: true,
        NOT: {
          id: +currentId
        },
        style: {
          id: +stylesParams || 2
        },
      }
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}