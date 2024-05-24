import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function PATCH(req, { params }) {
  const token = await getToken({ req })
  const id = params.id
  const json = await req.json();

  const { active } = await json

  if (token) {
    const favorites = await prisma.myFavourite.update({
      where: {
        id: +id
      },
      data: {
        active: Boolean(active)
      }
    })

    return NextResponse.json({ favorites })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}
