import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from 'next-auth/jwt';

export async function GET(req, res) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized!' });
  }

  try {
    const notifications = await prisma.notification.findMany({
      take: 4,
      where: {
        isRead: false,
      },
      include: {
        user: true,
        order: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    return NextResponse.json({ notifications })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}