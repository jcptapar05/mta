import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb'
import bcrypt from 'bcrypt'
import { getToken } from "next-auth/jwt"

export async function GET(req, res) {
  const token = await getToken({ req })

  if (token && (token?.role == "super_admin" || token?.role == "admin")) {
    try {
      const users = await prisma.user.findMany({
        select: {
          email: true,
          id: true,
          first_name: true,
          last_name: true,
          company: true,
          avatar: true,
          role: true
        },
        orderBy: {
          id: 'asc',
        },
      })

      return NextResponse.json({ users })
    } catch (error) {
      return NextResponse.json({ error: 'Not Found!' })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}

export const POST = async (req, res) => {
  const token = await getToken({ req })

  if (token && (token?.role == "super_admin" || token?.role == "admin")) {
    try {
      const json = await req.json();
      const { email, first_name, last_name, password, company, roleId, avatar, bio, social_media, website_url, portfolio_link } = await json

      const encryptPw = await bcrypt.hash(password, 10)

      const findUserIfExist = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (findUserIfExist) return NextResponse.json({ message: "Email is exist!" })

      let billingCompanyId = await prisma.company.create({
        data: {
          company: ""
        }
      })

      let shippingCompanyId = await prisma.company.create({
        data: {
          company: ""
        }
      })

      const users = await prisma.user.create({
        data: {
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: encryptPw,
          company: { connect: { id: +billingCompanyId.id } },
          roleId
        },
      });

      let userAddressId = await prisma.address.create({
        data: {
          companyId: Number(billingCompanyId.id),
          city: "",
          country: "",
          postal_code: "",
          state: "",
          phone_number: Number(0),
          address_1: "",
          address_2: "",
          userId: Number(users.id),
        },
      });

      await prisma.shippingAddress.create({
        data: {
          companyId: Number(shippingCompanyId.id),
          city: "",
          state: "",
          country: "",
          postal_code: "",
          address_1: "",
          address_2: "",
          set_default: true,
          phone_number: 0,
          address: { connect: { id: Number(userAddressId.id) } },
          userId: Number(users.id),
          same_with_Address: true
        },
      });


      if (roleId == 4) {
        artist = await prisma.artist.create({
          data: {
            userId: users.id,
            first_name,
            last_name,
            company,
            avatar,
            bio,
            social_media,
            portfolio_link,
            website_url,
            full_name: first_name + " " + last_name
          },
        });
      }

      return NextResponse.json({ user: users })
    } catch (error) {
      return NextResponse.json({ error: 'Not Found!' })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized!' });
  }
}
