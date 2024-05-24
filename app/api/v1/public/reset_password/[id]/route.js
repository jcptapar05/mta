import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';
import { getToken } from "next-auth/jwt"
import bcrypt from 'bcrypt'

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

export async function PATCH(req, { params }) {
  // const token = await getToken({ req })
  const id = params.id
  const json = await req.json();
  const { email, password } = await json

  let encryptPw;

  if (password != "" && password != null) {
    encryptPw = await bcrypt.hash(password, 10)
  }

  await prisma.user.update({
    where: {
      id: +id
    },
    data: {
      email,
      password: encryptPw,
      resetToken: null,
      resetTokenExpiry: null
    }
  })

  return NextResponse.json({ message: 'Success!' })
}
