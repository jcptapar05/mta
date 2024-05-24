import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export async function GET(req, res) {
  try {
    const surveyRes = await prisma.survey.findMany({
      include: {
        product: {
          include: {
            frame_size: true
          }
        },
        user: {
          select: {
            first_name: true,
            last_name: true,
            company: true,
            job_title: true
          }
        }
      }
    })
    return NextResponse.json({ surveyRes })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}


export const revalidate = 0
