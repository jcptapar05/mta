import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';
import { getToken } from "next-auth/jwt"
import bcrypt from 'bcrypt'

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

export async function GET(req, { params }) {
  const token = await getToken({ req })

  if (token && (token?.role == "super_admin" || token?.role == "admin")) {
    const user = await prisma.user.findUnique({
      where: {
        id: 1
      },
      include: {
        company: true
      }
    })

    const userData = exclude(user, ['password'])

    return NextResponse.json({ user: userData })
  } else {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export async function PATCH(req, { params }) {
  const token = await getToken({ req })
  const id = params.id
  const json = await req.json();

  const { email,
    firstname,
    lastname,
    company,
    password,
    roleId, companyId } = await json

  let encryptPw;

  if (password != "" && password != null) {
    encryptPw = await bcrypt.hash(password, 10)
  }

  if (token) {

    let userCompany = await prisma.company.update({
      where: {
        id: Number(companyId)
      },
      data: {
        company: company
      }
    })

    const user = await prisma.user.update({
      where: {
        id: +id
      },
      data: {
        email,
        first_name: firstname,
        last_name: lastname,
        password: password != "" && password != null ? encryptPw : undefined,
        roleId: +roleId,
      }
    })

    return NextResponse.json({ user, userCompany, message: 'Success!' })
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export async function DELETE(req, { params }) {
  const token = await getToken({ req })
  const id = +params.id

  if (token && token?.role == "super_admin") {
    const user = await prisma.user.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ user })
  } else {
    return NextResponse.json({ error: 'Not Found!' })
  }
}