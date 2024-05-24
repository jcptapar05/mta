import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {

  const name = params.id

  console.log(name);

  // const findUserIfExist = await prisma.product.findUnique({
  //   where: {
  //     name: name
  //   }
  // })

  // if (!findUserIfExist) {
  //   return NextResponse.json({ message: 'Not Found!' })
  // }

  try {
    const product = await prisma.product.findMany({
      where: {
        name: name
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

    return NextResponse.json({ product, message: "Success!" }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  } catch (error) {
    return NextResponse.json({ message: 'Not Found!' })
  }
}