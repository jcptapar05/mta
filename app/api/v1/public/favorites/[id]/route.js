import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function DELETE(req, { params }) {

  const id = +params.id
  const myFavourite = await prisma.myFavourite.delete({
    where: {
      id
    }
  })

  return NextResponse.json({ myFavourite })
}