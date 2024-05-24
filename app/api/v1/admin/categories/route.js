import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()

    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const { name } = await json

    const category = await prisma.category.create({
      data: {
        name
      },
    });

    return NextResponse.json({ category })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
