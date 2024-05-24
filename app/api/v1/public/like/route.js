import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req) {
  const url = new URL(req?.url)
  const userId = url?.searchParams?.get("userId")
  const productId = url?.searchParams?.get("productId")

  try {
    const like = await prisma.like.findFirst({
      where: {
        userId: Number(userId),
        productId: Number(productId)
      }
    })

    return NextResponse.json({ like })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}

export const POST = async (req, res) => {

  try {
    const json = await req.json();
    const { userId, productId, isActive } = await json

    let liked;

    const findUserIfExist = await prisma.like.findFirst({
      where: {
        userId: +userId,
        productId: +productId,
      }
    })

    if (findUserIfExist) {
      liked = await prisma.like.update({
        where: {
          id: findUserIfExist.id
        },
        data: {
          active: Boolean(isActive)
        }
      })
    } else {
      liked = await prisma.like.create({
        data: {
          userId, productId
        },
      });
    }

    return NextResponse.json({ liked })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}

export const revalidate = 0
