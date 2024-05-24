import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';

export async function GET(req, { params }) {

  const user = await prisma.order.findUnique({
    where: {
      id: +params.id
    }
  })

  return NextResponse.json({ user })
}

export async function PATCH(req, { params }) {
  const id = params.id
  const json = await req.json();

  // const url = new URL(req?.url)
  // const status = url?.searchParams?.get("status")
  const { status } = await json

  // if (token) {
  await prisma.order.update({
    where: {
      id: +id
    },
    data: {
      status: status
    }
  })

  return NextResponse.json({ message: 'Successfully Updated!' })
  // } else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}