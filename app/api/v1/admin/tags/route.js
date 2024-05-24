import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const tags = await prisma.tag.findMany()

    return NextResponse.json({ tags })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const { name } = await json

    const tag = await prisma.tag.create({
      data: {
        name
      },
    });

    return NextResponse.json({ user: tag })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
