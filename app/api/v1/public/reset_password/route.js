import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function POST(req) {
  const json = await req.json();
  const { token } = await json

  try {
    const user = await prisma.user.findMany({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date()
        }
      },
      select: {
        email: true,
        id: true,
        resetToken: true,
        resetTokenExpiry: true
      }
    })

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}