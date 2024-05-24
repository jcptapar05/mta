import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function GET(req, { params }) {
  const token = await getToken({ req })

  if (token && token?.role == "super_admin") {
    try {
      const id = params.id
      const style = await prisma.style.findUnique({
        where: {
          id: +id
        }
      })

      return NextResponse.json({ style })
    } catch (error) {
      return NextResponse.json({ error: 'Not Found!' })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export async function PATCH(req, { params }) {
  const token = await getToken({ req })
  const id = params.id
  const json = await req.json();

  const { name } = await json

  if (token) {
    const style = await prisma.style.update({
      where: {
        id: +id
      },
      data: {
        name
      }
    })

    return NextResponse.json({ style, message: 'Success!' })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export async function DELETE(req, { params }) {
  const token = await getToken({ req })

  if (token && token?.role == "super_admin") {
    const id = +params.id
    const style = await prisma.style.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ style })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}