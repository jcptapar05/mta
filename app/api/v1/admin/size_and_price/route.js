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

export const POST = async (req, res) => {
  try {
    const json = await req.json();
    const { price, height, thick, width } = await json

    const newName = `${height} cm x ${width} cm x ${thick} mm`

    const size_and_price = await prisma.sizeAndPrice.create({
      data: {
        price: +price, name: newName, height: +height, thick: +thick, width: +width
      },
    });
    return NextResponse.json({ size_and_price, message: "Success!" })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}