import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET() {
  try {
    const users = await prisma.user.findMany()

    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (request) => {
  try {
    const json = await request.json();
    const { email, first_name, last_name } = await json

    const users = await prisma.user.create({
      data: {
        email: email,
        first_name: first_name,
        last_name: last_name,
      },
    });

    return NextResponse.json({ user: users })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
