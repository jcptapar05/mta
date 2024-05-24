import { NextResponse } from "next/server"

import prisma from "@/lib/prismaDb"
export const revalidate = true;

export const GET = async () => {
  try {
    const artist = await prisma.artist.findMany({
      // where: {
      //   is_featured: true
      // },
      orderBy: {
        id: "desc",
      },
      take: 1,
    })

    return NextResponse.json({ artist })
  } catch (error) {
    return NextResponse.json({ error: "Not Found!" })
  }
}
