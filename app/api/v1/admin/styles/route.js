import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
// import { getToken } from "next-auth/jwt"

export async function GET(req, res) {
  // const token = await getToken({ req })

  // if (token && token?.role == "super_admin") {
  try {
    const styles = await prisma.style.findMany()
    return NextResponse.json({ styles })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
  // }
  // else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}

export const POST = async (req, res) => {
  // const token = await getToken({ req })

  // if (token && token?.role == "super_admin") {
  try {
    const json = await req.json();
    const { name } = await json

    const style = await prisma.style.create({
      data: {
        name
      },
    });
    return NextResponse.json({ style })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
  // } else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}

export const revalidate = 0
