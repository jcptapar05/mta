import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
export const revalidate = true;
export const GET = async () => {
  try {
    const artists = await prisma.artist.findMany({
      where: {
        active: true
      }
    })

    return NextResponse.json({ artists })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}