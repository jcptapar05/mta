import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
export const revalidate = true;
export const GET = async () => {
  try {
    const frame_sizes = await prisma.frameSize.findMany()

    return NextResponse.json({ frame_sizes })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}