import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from "next-auth/jwt"

export const GET = async (req, res) => {
  const token = await getToken({ req })

  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: token.id,
        active: true
      }
    })

    return NextResponse.json({ cart })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req, res) => {
  try {
    const token = await getToken({ req })
    const json = await req.json();
    const { productId, quantity, status, items } = await json

    const checkIfCartExist = await prisma.cart.findFirst({
      where: {
        active: true,
        userId: token.id
      }
    })

    let cart;

    if (token) {
      if (checkIfCartExist) {
        cart = await prisma.cart.update({
          where: {
            id: Number(checkIfCartExist.id)
          },
          data: {
            cartItems: items
          }
        })
      } else {
        cart = await prisma.cart.create({
          data: {
            cartItems: items,
            userId: token.id
          }
        })
      }
    }

    return NextResponse.json({ cart })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
