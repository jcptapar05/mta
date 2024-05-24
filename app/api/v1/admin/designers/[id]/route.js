import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"
import { redirect } from 'next/navigation'

export async function GET(req, { params }) {
  const token = await getToken({ req })

  if (token && token?.role == "super_admin") {
    try {
      const id = +params.id
      const roles = await prisma.role.findUnique({
        where: {
          id
        }
      })

      return NextResponse.json({ roles })
    } catch (error) {
      return NextResponse.json({ error: 'Not Found!' })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export async function PATCH(request, { params }) {
  const token = await getToken({ req })
  const id = +params.id
  const json = await request.json();
  const { name } = await json

  if (token) {
    const user = await prisma.role.update({
      where: {
        id: id
      },
      data: {
        name
      }
    })

    return NextResponse.json({ user })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export async function DELETE(req, { params }) {
  const token = await getToken({ req })

  if (token && token?.role == "super_admin") {
    const id = +params.id
    const user = await prisma.role.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ user })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}