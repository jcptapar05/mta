import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'

export const GET = async (req, res) => {
  const url = new URL(req?.url)

  const currentPage = url?.searchParams?.get("page")
  const pageLimit = url?.searchParams?.get("limit")
  const sort = url?.searchParams?.get("sort")
  const categories = url?.searchParams?.get("categories")
  const paletteParams = url?.searchParams?.get("palettes")
  const frameSizeParams = url?.searchParams?.get("frame_sizes")
  const roomTypesParams = url?.searchParams?.get("room_types")
  const artistsParams = url?.searchParams?.get("artists")
  const stylesParams = url?.searchParams?.get("styles")

  const skippy = (currentPage - 1) * pageLimit;

  let products;

  try {
    // if (sort == 'date') {
    // products = await prisma.product.findMany({
    //   skip: parseInt(skippy) || 0,
    //   take: parseInt(pageLimit) || 10,
    //   where: {
    //     categories: {
    //       OR: [
    //         {
    //           some: {
    //             name: categories || undefined,
    //           },
    //         },
    //         {
    //           AND: [
    //             { none: {} },
    //             { some: {} }, // This condition ensures that products with no categories are not included
    //           ],
    //         },
    //       ],
    //     },
    //     frame_size: {
    //       name: frameSizeParams || undefined
    //     },
    //     room_type: {
    //       name: roomTypesParams || undefined
    //     },
    //     artist: {
    //       full_name: artistsParams || undefined
    //     },
    //     style: {
    //       name: stylesParams || undefined
    //     },
    //   },
    //   orderBy: [
    //     {
    //       created_at: 'desc'
    //     }
    //   ],
    //   include: {
    //     categories: true,
    //     palettes: true,
    //     room_type: true,
    //     frame_size: true,
    //     artist: true,
    //     designer: true,
    //     style: true,
    //     material: true
    //   },
    // })

    const productsQuery = {
      skip: parseInt(skippy) || 0,
      take: parseInt(pageLimit) || 10,
      where: {
        active: true,
        category: {
          name: categories || undefined,
        },
        style: {
          id: +stylesParams || undefined,
        },
      },
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
      include: {
        palettes: true,
        room_type: true,
        frame_size: true,
        artist: true,
        designer: true,
        style: true,
        material: true,
        category: true
      },
    };

    // if (categories) {
    //   productsQuery.where.categories = {
    //     some: {
    //       name: categories,
    //     },
    //   };
    // }

    products = await prisma.product.findMany(productsQuery);

    const len = await prisma.product.findMany()

    return NextResponse.json({ products, productsLen: len.length })

  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}