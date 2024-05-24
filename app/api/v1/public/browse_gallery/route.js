import { NextResponse } from "next/server"

import prisma from "@/lib/prismaDb"

export const revalidate = true;

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      skip: 0,
      take: 15,
      where: {
        active: true
      },
      orderBy: {
        id: "desc",
      },
      include: {
        palettes: true,
        room_type: true,
        frame_size: true,
        artist: true,
        designer: true,
      },
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: "Not Found!" })
  }
}
