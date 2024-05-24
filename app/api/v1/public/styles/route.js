import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
export const revalidate = true;
export const GET = async () => {
  try {
    const styles = await prisma.style.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ styles })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}