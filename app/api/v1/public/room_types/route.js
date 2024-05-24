import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaDb';

export const GET = async () => {
  try {
    const room_types = await prisma.roomType.findMany();

    return NextResponse.json({ room_types });
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' });
  }
};