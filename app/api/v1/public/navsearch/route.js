import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req, res) {
  const url = new URL(req?.url)

  const search = url?.searchParams?.get("search")
  try {

    const products = await prisma.product.findMany({
      where: {
        active: true
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}