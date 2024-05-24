import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function GET(req, { params }) {
  // const token = await getToken({ req })

  // if (token && token?.role == "super_admin") {
  try {
    const id = params.id
    const category = await prisma.category.findUnique({
      where: {
        id: +id
      }
    })

    return NextResponse.json({ category })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
  // } else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}

export async function PATCH(req, { params }) {
  const json = await req.json();

  const { name, active } = await json
  const id = params.id

  const category = await prisma.category.update({
    where: {
      id: +id
    },
    data: {
      name,
      active: {
        set: active
      }
    }
  })
  return NextResponse.json({ category })
}
