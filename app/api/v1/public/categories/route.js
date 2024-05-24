import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
export const revalidate = true;
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        active: true
      }
    })

    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}