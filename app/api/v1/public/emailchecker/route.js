import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export const POST = async (req, res) => {
  try {
    const json = await req.json();
    const { email } = await json

    const findUserIfExist = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (findUserIfExist) {
      return NextResponse.json({ message: "Email is already exist!" })
    }

    return NextResponse.json({ message: "ok" })

  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}