import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDb'
import { getToken } from "next-auth/jwt"

import { v4 } from "uuid";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const Bucket = process.env.S3_AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.S3_AWS_REGION,
  credentials: { accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY }
});

export const GET = async (req) => {
  const token = await getToken({ req })
  const userId = await token.id
  const userRole = await token.role

  try {
    const products = await prisma.product.findMany({
      where: {
        userId: userRole == 'artist' ? userId : undefined
      },
      include: {
        category: true,
        palettes: true,
        room_type: true,
        frame_size: true,
        artist: true,
        designer: true,
        material: true
      }
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const POST = async (req) => {
  try {
    const token = await getToken({ req })
    const userRole = await token.role

    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const photo = formData.get("photo");
    // const quantity = formData.get("quantity");
    const categoryId = formData.get("categoryId");
    // const paletteId = formData.get("paletteId");
    const roomTypeId = formData.get("roomTypeId");
    const frameSizeId = formData.get("frameSizeId");
    const userId = formData.get("userId");
    const artistId = formData.get("artistId");
    // const designerId = formData.get("designerId");
    const styleId = formData.get("styleId");
    const materialId = formData.get("materialId");
    const nft_link = formData.get("nft_link");
    const is_nft = formData.get("is_nft");
    const is_set = formData.get("is_set");
    const is_set_of = formData.get("is_set_of");
    const video = formData.get("video");
    const glbFile = formData.get("glbFile");
    const weight = formData.get("weight");
    const ar = formData.get("ar");
    const thumbnails = formData.get("thumbnails");
    const colors = formData.get('colors')
    // For Gallery Imgs
    const productLen = formData.get('productImgLen');
    // For Gallery Photos
    const productPhotoLen = formData.get('productPhotoLen');

    // Thumbnails Photos
    const thumbnailBlob = await thumbnails.arrayBuffer()
    const thumbnailExtname = thumbnails.name.split('.').pop();
    const thumbnailFilename = `arts/${name}/thumbnails/` + v4() + "." + thumbnailExtname.toLowerCase();

    const thumbnailParams = {
      Bucket,
      Key: thumbnailFilename,
      Body: thumbnailBlob
    };

    const thumbnailCommand = new PutObjectCommand(thumbnailParams);
    await s3.send(thumbnailCommand);

    // upload multiple images for gallery
    const productPhotos = []
    for (let i = 0; Number(productPhotoLen) > i; i++) {
      let item = formData.get(`product_photo${i}`);
      const blob = await item.arrayBuffer()
      const extname = item.name.split('.').pop();
      const filename = `arts/${name}/gallery/` + v4() + "." + extname.toLowerCase();
      const params = {
        Bucket,
        Key: filename,
        Body: blob,
        ContentType: item.type
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      productPhotos.push(filename)
    }

    // upload multiple images for product images
    const productImgs = []
    for (let i = 0; Number(productLen) > i; i++) {
      let item = formData.get(`product_img${i}`);
      const blob = await item.arrayBuffer()
      const extname = item.name.split('.').pop();
      const filename = `arts/${name}/photos/` + v4() + "." + extname.toLowerCase();
      const params = {
        Bucket,
        Key: filename,
        Body: blob,
        ContentType: item.type
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
      productImgs.push(filename)
    }

    // // video
    let videoSrc;
    if (video) {
      const videoCommand = new PutObjectCommand({
        Bucket, Key: `arts/${name}/videos/` + String(video.name)
      });
      videoSrc = await getSignedUrl(s3, videoCommand, { expiresIn: 3600 });
    }

    // 3D File
    let glbFilesrc;
    if (glbFile) {
      const glbFileCommand = new PutObjectCommand({
        Bucket, Key: `arts/${name}/three_d/` + String(glbFile.name)
      });
      glbFilesrc = await getSignedUrl(s3, glbFileCommand, { expiresIn: 3600 });
    }

    let getArtistId;
    if (userRole == 'artist') {
      getArtistId = await prisma.artist.findFirst({
        where: {
          userId: Number(artistId)
        }
      })
    }

    // const prices = await prisma.price.create({
    //   data: {
    //     original_price: 51.54,
    //     price1: +is_set_of * 51.54,
    //     price2: +is_set_of * 91.44,
    //     price3: +is_set_of * 274.32,
    //     price4: +is_set_of * 69.45,
    //     price5: +is_set_of * 123.45,
    //     price6: +is_set_of * 370.35,
    //   },
    // });

    let product;
    if (name && description) {
      product = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          photo: productPhotos,
          in_stock: true,
          categoryId: +categoryId,
          thumbnails: thumbnailFilename,
          // roomTypeId: Number(roomTypeId),
          frameSizeId: Number(frameSizeId),
          userId: Number(userId),
          artistId: userRole == 'artist' ? Number(getArtistId.id) : Number(artistId),
          styleId: Number(styleId),
          materialId: Number(materialId),
          nft_link,
          set_of: +is_set_of,
          video: video.name || null,
          ar,
          glb_file_3d: glbFile.name || null,
          is_nft: is_nft == "true" ? true : false,
          is_set: is_set == "true" ? true : false,
          weight: Number(2),
          product_img: productImgs,
          colors,
          // priceId: +prices.id
        },
      });
    }

    return NextResponse.json({ message: "Success", glbFilesrc, videoSrc })
  } catch (error) {
    return NextResponse.json({ message: 'Not Found!' })
  }
}

// upload multiple images for image item
// const photoBlob = await photo.arrayBuffer()
// const extname = photo.name.split('.').pop();
// const filename = v4() + "." + extname.toLowerCase();
// const params = {
//   Bucket,
//   Key: filename,
//   Body: photoBlob,
// };
// const command = new PutObjectCommand(params);
// const uploaded = await s3.send(command);

// let data = []

// for (let i = 0; products.length > i; i++) {
//   // Fetch Photo
//   let photo;
//   if (products[i]?.photo) {
//     const photoLink = new GetObjectCommand({ Bucket, Key: String(products[i]?.photo) || 'tts.png' });
//     photo = await getSignedUrl(s3, photoLink, { expiresIn: 432000 });
//   }
//   // Fetch Photo
//   // Fetch Product Images
//   const prodImgLinks = []
//   if (products[i]?.product_img) {
//     for (let j = 0; products[i].product_img.length > j; j++) {
//       const productImgLinks = new GetObjectCommand({ Bucket, Key: products[i]?.product_img[j] });
//       const product_img = await getSignedUrl(s3, productImgLinks, { expiresIn: 432000 });

//       console.log(product_img);
//       prodImgLinks.push(product_img)
//     }
//   }
//   // Fetch Product Images

//   // Update and replace the original photo and product image to aws s3 bucket
//   let des = { ...products[i], photo, product_img: prodImgLinks }

//   data.push(des)
// }

export const revalidate = true;