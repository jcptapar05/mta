import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req) {

  try {
    const size_and_price = await prisma.sizeAndPrice.findMany()

    return NextResponse.json({ size_and_price })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}