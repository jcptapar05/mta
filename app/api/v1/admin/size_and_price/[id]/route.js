import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function PATCH(req, { params }) {
  const id = +params.id
  const json = await req.json();
  const { price, height, thick, width } = await json

  const newName = `${height} cm x ${width} cm x ${thick} mm`

  const size_and_price = await prisma.sizeAndPrice.update({
    where: {
      id: +id
    },
    data: {
      price: +price, name: newName, height: +height, thick: +thick, width: +width
    }
  })

  return NextResponse.json({ size_and_price, message: "Success!" })

}

// export async function DELETE(req, { params }) {
//   const token = await getToken({ req })

//   if (token && token?.role == "super_admin") {
//     const id = +params.id
//     const faq = await prisma.faq.delete({
//       where: {
//         id
//       }
//     })

//     return NextResponse.json({ faq, message: 'Successfully deleted!' })
//   } else {
//     return NextResponse.json({ error: 'Unauthorized!' });
//   }
// }