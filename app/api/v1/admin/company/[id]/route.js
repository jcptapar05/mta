import prisma from '@/lib/prismaDb'
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized!' });
  }

  try {
    const id = params.id
    const company = await prisma.company.findUnique({
      where: {
        id: +id
      }
    })

    return NextResponse.json({ company })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export async function PATCH(req, { params }) {
  const token = await getToken({ req })
  const id = params.id
  const json = await req.json();

  const { name } = await json

  if (token) {
    const user = await prisma.role.update({
      where: {
        id: +id
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