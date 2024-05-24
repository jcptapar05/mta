import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function PATCH(req, { params }) {
  const id = +params.id
  const json = await req.json();
  const { title, content } = await json

  const faq = await prisma.faq.update({
    where: {
      id: +id
    },
    data: {
      title, content
    }
  })

  return NextResponse.json({ faq, message: "Success!" })

}

export async function DELETE(req, { params }) {
  const token = await getToken({ req })

  if (token && token?.role == "super_admin") {
    const id = +params.id
    const faq = await prisma.faq.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ faq, message: 'Successfully deleted!' })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}