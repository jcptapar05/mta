import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const id = params.id
    const likes = await prisma.like.findMany({
      where: {
        productId: +id
      }
    })
    return NextResponse.json({ likes })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}