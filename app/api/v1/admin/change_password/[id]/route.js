import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"
import bcrypt from 'bcrypt'

export async function PATCH(req, { params }) {
  const token = await getToken({ req })
  const json = await req.json();
  const id = params.id

  const { password } = await json

  const encryptPw = await bcrypt.hash(password, 10)
  await prisma.user.update({
    where: {
      id: +id || token.id
    },
    data: {
      password: encryptPw
    }
  })

  return NextResponse.json({ message: "Password Successfully Changed!" })

}