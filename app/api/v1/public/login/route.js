import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import bcrypt from 'bcrypt'

// export const POST = async (request) => {
//   try {
//     const json = await request.json();
//     const { email, password } = await json

//     const user = await prisma.user.findUnique({
//       where: {
//         email: email
//       }
//     })

//     if (!user) return NextResponse.json({ error: 'Username or Password is incorrect!' })

//     const verifiedPw = await bcrypt.compare(password, user.password)

//     if (!verifiedPw) return NextResponse.json({ error: 'Username or Password is incorrect!' })

//     const userInfo = {
//       id: 2,
//       email: "baby1@1cdc.com",
//       first_name: "Baby",
//       last_name: "Taps",
//       company: null,
//       avatar: "asdasdas",
//       roleId: null
//     }

//     return NextResponse.json({ user: userInfo })
//   } catch (error) {
//     return NextResponse.json({ error: 'Not Found!' })
//   }
// }
