import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const frame_sizes = await prisma.frameSize.findMany()

    return NextResponse.json({ frame_sizes })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const { name, width, height, depth, price } = await json

    const frame_size = await prisma.frameSize.create({
      data: {
        name, width, height, depth, price
      },
    });

    return NextResponse.json({ frame_size })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
