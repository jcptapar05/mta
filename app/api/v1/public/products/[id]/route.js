import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {

  const id = params.id

  const findUserIfExist = await prisma.product.findUnique({
    where: {
      id: +id
    }
  })

  if (!findUserIfExist) {
    return NextResponse.json({ message: 'Not Found!' })
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +id
      },
      include: {
        palettes: true,
        room_type: true,
        frame_size: true,
        artist: true,
        designer: true,
        material: true,
        prices: true
      }
    })

    return NextResponse.json({ product, message: "Success!" })
  } catch (error) {
    return NextResponse.json({ message: 'Not Found!' })
  }
}