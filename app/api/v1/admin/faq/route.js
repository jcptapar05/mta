import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req, res) {
  try {
    const faqs = await prisma.faq.findMany()
    return NextResponse.json({ faqs })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req, res) => {
  try {
    const json = await req.json();
    const { title, content } = await json

    const faqs = await prisma.faq.create({
      data: {
        title, content
      },
    });
    return NextResponse.json({ faqs, message: "Success!" })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}