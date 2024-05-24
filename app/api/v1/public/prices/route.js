import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req) {

  try {
    const prices = await prisma.price.findMany()

    return NextResponse.json({ prices })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}