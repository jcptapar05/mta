
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req, res) {
  // const token = await getToken({ req })

  // if (token && token?.role == "super_admin") {
  try {
    const virtualGallery = await prisma.virtualGallery.findMany()
    return NextResponse.json({ virtualGallery })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
  // }
  // else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}

export const revalidate = 0
