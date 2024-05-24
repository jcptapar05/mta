import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from "next-auth/jwt"

export async function GET(req, res) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized!' });
  }

  try {
    const company = await prisma.company.findMany({
      include: {
        user: {
          select: {
            id: true,
          }
        }
      }
    })
    return NextResponse.json({ company })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req, res) => {
  // const token = await getToken({ req })

  // if (token && token?.role == "super_admin") {
  try {
    const json = await req.json();
    const { name } = await json

    const role = await prisma.role.create({
      data: {
        name
      },
    });
    return NextResponse.json({ role })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
  // } else {
  //   return NextResponse.json({ error: 'Unauthorized!' });
  // }
}

export const revalidate = 0
