import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const room_types = await prisma.roomType.findMany()

    return NextResponse.json({ room_types })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const { name } = await json

    const room_types = await prisma.roomType.create({
      data: {
        name
      },
    });

    return NextResponse.json({ room_types: room_types })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
