import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from 'next-auth/jwt';

export const revalidate = 0

export async function GET(req, res) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized!' });
  }

  try {
    const mostLikedItems = await prisma.like.groupBy({
      by: ['productId', 'active'],
      where: {
        active: true,
        userId: {
          not: null
        }
      },
      _count: true,
      orderBy: {
        _count: {
          id: 'desc'
        },
      }
    });

    // console.log(mostLikedItems);

    const newLikesList = []
    for (let i = 0; mostLikedItems.length > i; i++) {
      const products = await prisma.product.findMany({
        where: {
          id: mostLikedItems[i].productId
        }
      })

      const newProduct = {
        product: products,
        likes_count: mostLikedItems[i]._count
      }

      newLikesList.push(newProduct)
    }

    const likes = newLikesList.splice(0, 10)

    return NextResponse.json({ likes })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}


