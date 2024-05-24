import prisma from '@/lib/prismaDb'
import { NextResponse } from 'next/server';

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

export async function PATCH(req, { params }) {
  const id = params.id

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const photo = formData.get("photo");
    const isActive = formData.get("isActive");
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
    const video = formData.get("video");
    const glbFile = formData.get("glbFile");
    const weight = formData.get("weight");
    const ar = formData.get("ar");
    const thumbnails = formData.get("thumbnails");
    const colors = formData.get('colors')
    const is_set = formData.get("is_set");
    const is_set_of = formData.get("is_set_of");
    const pricesId = formData.get("pricesId");
    // For Gallery Imgs
    const productLen = formData.get('productImgLen');
    // For Gallery Photos
    const productPhotoLen = formData.get('productPhotoLen');

    // Thumbnails Photos
    let thumbnailBlob
    let thumbnailExtname
    let thumbnailFilename

    if (thumbnails) {
      thumbnailBlob = await thumbnails.arrayBuffer()
      thumbnailExtname = thumbnails.name.split('.').pop();
      thumbnailFilename = `arts/${name}/thumbnails/` + v4() + "." + thumbnailExtname.toLowerCase();

      const thumbnailParams = {
        Bucket,
        Key: thumbnailFilename,
        Body: thumbnailBlob
      };
      const thumbnailCommand = new PutObjectCommand(thumbnailParams);
      await s3.send(thumbnailCommand);
    }

    // upload multiple images for gallery
    const productPhotos = []
    if (productPhotoLen > 0) {
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
    }

    // upload multiple images for product images
    const productImgs = []
    if (productLen > 0) {
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
    }

    // video
    let videoSrc;
    if (video && video != "") {
      const videoCommand = new PutObjectCommand({
        Bucket, Key: `arts/${name}/videos/` + String(video.name)
      });
      videoSrc = await getSignedUrl(s3, videoCommand, { expiresIn: 3600 });
    }

    // // 3D File
    let glbFilesrc;
    if (glbFile && glbFile != "") {
      const glbFileCommand = new PutObjectCommand({
        Bucket, Key: `arts/${name}/three_d/` + String(glbFile.name)
      });
      glbFilesrc = await getSignedUrl(s3, glbFileCommand, { expiresIn: 3600 });
    }

    // let getArtistId;
    // if (userRole == 'artist') {
    //   getArtistId = await prisma.artist.findFirst({
    //     where: {
    //       userId: Number(artistId)
    //     }
    //   })
    // }

    let prices;
    // console.log(pricesId, "PRICES");
    // if (pricesId == 'none') {
    //   prices = await prisma.price.create({
    //     data: {
    //       original_price: 51.54,
    //       price1: +is_set_of * 51.54,
    //       price2: +is_set_of * 91.44,
    //       price3: +is_set_of * 274.32,
    //       price4: +is_set_of * 69.45,
    //       price5: +is_set_of * 123.45,
    //       price6: +is_set_of * 370.35,
    //     },
    //   });
    // } else {
    //   prices = await prisma.price.update({
    //     where: {
    //       id: +pricesId
    //     },
    //     data: {
    //       original_price: 51.54,
    //       price1: +is_set_of * 51.54,
    //       price2: +is_set_of * 91.44,
    //       price3: +is_set_of * 274.32,
    //       price4: +is_set_of * 69.45,
    //       price5: +is_set_of * 123.45,
    //       price6: +is_set_of * 370.35,
    //     },
    //   })
    // }

    console.log(colors, id)

    let product;
    if (name && description) {
      product = await prisma.product.update({
        where: {
          id: +id
        },
        data: {
          name: name || undefined,
          description: description || undefined,
          active: isActive == "true" ? true : false,
          price: Number(price) || undefined,
          photo: productPhotos.length > 0 ? productPhotos : undefined,
          in_stock: true,
          categoryId: +categoryId || undefined,
          thumbnails: thumbnailFilename || undefined,
          roomTypeId: Number(roomTypeId) || undefined,
          frameSizeId: Number(frameSizeId) || undefined,
          userId: Number(userId) || undefined,
          // artistId: userRole == 'artist' ? Number(getArtistId.id) : Number(artistId),
          styleId: Number(styleId) || undefined,
          materialId: Number(materialId) || undefined,
          nft_link,
          video: video.name || undefined,
          set_of: +is_set_of || undefined,
          // ar,
          glb_file_3d: glbFile.name || undefined,
          is_nft: is_nft == "true" ? true : false,
          is_set: is_set == "true" ? true : false,
          weight: Number(2) || undefined,
          product_img: productImgs.length > 0 ? productImgs : undefined,
          colors: colors || undefined,
          // priceId: +prices.id || undefined
        },
      })
    }

    // return NextResponse.json({ product: "Success" })
    return NextResponse.json({ product: "Success", glbFilesrc, videoSrc })
  } catch (error) {
    return NextResponse.json({ error: 'Not Found!' })
  }
}

export const revalidate = true;