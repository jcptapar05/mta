import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export const revalidate = true;

export const GET = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      skip: 0,
      take: 4,
      orderBy: [
        {
          id: 'desc'
        }
      ],
      include: {
        category: true,
        palettes: true,
        room_type: true,
        frame_size: true,
        artist: true,
        designer: true,
        style: true,
        material: true
      },
    })

    return NextResponse.json({ product })
  } catch (error) {
    return NextResponse.json({ error: "Not Found!" })
  }
}
