import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export const GET = async (req, res) => {
  let products;

  const productslen = await prisma.product.findMany()
  try {
    products = await prisma.product.findMany({
      skip: Math.floor(Math.random() * productslen.length - 3),
      take: 3,
      where: {
        active: true,
      }
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}