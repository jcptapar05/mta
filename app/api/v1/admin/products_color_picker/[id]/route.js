import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';

export const revalidate = true;


export async function PATCH(req, { params }) {
  const id = params.id

  try {
    const formData = await req.formData();

    const colors = formData.get('colors')

    product = await prisma.product.update({
      where: {
        id: +id
      },
      data: {
        colors: colors || undefined,
      },
    })

    return NextResponse.json({ message: "Success" })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}