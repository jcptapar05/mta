import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const palettes = await prisma.palette.findMany()

    return NextResponse.json({ palettes })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const { name, hexcode } = await json

    const palette = await prisma.palette.create({
      data: {
        name,
        hexcode
      },
    });

    return NextResponse.json({ palette })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
