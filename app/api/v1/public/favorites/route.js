import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
export const revalidate = true;
export const GET = async (req) => {
  const url = new URL(req?.url)
  const userId = url?.searchParams?.get("userId")
  const productId = url?.searchParams?.get("productId")

  try {
    const myFavourite = await prisma.myFavourite.findFirst({
      where: {
        userId: Number(userId),
        productId: Number(productId)
      }
    })

    return NextResponse.json({ myFavourite })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req) => {

  try {
    const json = await req.json();
    const { userId, productId, isActive } = await json
    let myFavourite

    const findUserIfExist = await prisma.myFavourite.findFirst({
      where: {
        userId: Number(userId),
        productId: Number(productId),
      }
    })

    if (findUserIfExist) {
      myFavourite = await prisma.myFavourite.update({
        where: {
          id: findUserIfExist.id
        },
        data: {
          active: Boolean(isActive)
        }
      })
    } else {
      myFavourite = await prisma.myFavourite.create({
        data: {
          userId,
          productId
        },
      });
    }

    return NextResponse.json({ myFavourite })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}