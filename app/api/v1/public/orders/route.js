import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export const GET = async () => {
  try {
    const orders = await prisma.order.findMany()

    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req, res) => {
  try {
    const json = await req.json();
    const { cartItems, userId, addressId, shippingAddressId, instructions, cartTotalPrice, cartId } = await json

    console.log(cartId)

    for (let i = 0; cartItems.length > i; i++) {
      await prisma.product.update({
        where: {
          id: +cartItems[i].productToCart.id
        },
        data: {
          total_sold: {
            increment: Number(cartItems[i].orderDetails.quantity)
          }
        }
      })
    }

    let total_price = 0

    for (let i = 0; cartItems.length > i; i++) {
      total_price += Number(cartItems[i].orderDetails.price) * Number(cartItems[i].orderDetails.quantity)
    }

    const order = await prisma.order.create({
      data: {
        product: cartItems,
        status: 'pending',
        total_price,
        instructions,
        cartTotalPrice: +cartTotalPrice
      }
    })

    const orderDetails = await prisma.orderDetail.create({
      data: {
        userId,
        orderId: order.id,
        shippingAddressId,
        addressId
      }
    })

    const notification = await prisma.notification.create({
      data: {
        userId,
        orderId: order.id,
      }
    })

    await prisma.cart.update({
      where: {
        id: Number(cartId)
      },
      data: {
        active: false
      }
    })

    return NextResponse.json({ message: 'Successfully Purchased!' })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}
