import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const materials = await prisma.material.findMany()

    return NextResponse.json({ materials })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const { name } = await json

    const material = await prisma.material.create({
      data: {
        name
      },
    });

    return NextResponse.json({ material })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
