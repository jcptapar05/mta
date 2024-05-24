import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export const POST = async (req, res) => {
  try {
    const json = await req.json();
    const { productId, quantity, userId, surveyMessage } = await json

    const surveyRes = await prisma.survey.create({
      data: {
        productId, quantity, userId, survey_message: surveyMessage
      },
    });
    return NextResponse.json({ surveyRes, message: 'success!' })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }

}