// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function initialArtworkSeed() {
//   await prisma.product.createMany({
//     data: [
//       {
//         name: "JP-17-0026",
//         sku: "JP-17-0026",
//         description:
//           "A striking monochrome portrait unfolds, showcasing a woman adorned with high hair and butterfly accessories. Her style is reminiscent of classic fashion, all the while exuding a modern edge. The scene seems to be from a photo shoot, as the woman's intense gaze commands attention. She is clothed in attire that resembles an academic gown, adding an element of sophistication to her look.",
//         styleId: 2,
//         thumbnails: "arts/JP-17-0026/thumbnails/JP-17-0026.jpg",
//         glb_file_3d: "JP-17-0026.glb",
//         video: "JP-17-0026.mp4",
//         photo: [
//           "arts/JP-17-0026/gallery/JP-17-0026-1.jpg",
//           "arts/JP-17-0026/gallery/JP-17-0026-2.jpg",
//           "arts/JP-17-0026/gallery/JP-17-0026-3.jpg",
//         ],
//         userId: 1,
//         set_of: 1,
//         product_img: [
//           "arts/JP-17-0026/photos/JP-17-0026_1.jpg",
//           "arts/JP-17-0026/photos/JP-17-0026_2.jpg",
//           "arts/JP-17-0026/photos/JP-17-0026_3.jpg",
//           "arts/JP-17-0026/photos/JP-17-0026.jpg",
//         ],
//         in_stock: true,
//         categoryId: 1,
//         packaging: [
//           { size: 2, img: "arts/JP-17-0026/frame/JP-17-0026-1.jpg" },
//           { size: 3, img: "arts/JP-17-0026/frame/JP-17-0026-2.jpg" },
//         ],
//         frameSizeId: 1,
//         weight: 2,
//       },
//       {
//         name: "JP-17-0027",
//         sku: "JP-17-0027",
//         description:
//           "In this black and white image, a young woman, no older than her early twenties, showcases an audacious high hair piece. Her hair, intricately adorned with flowers, exudes a sense of elegance and bold fashion sense. The monochrome palette, combined with the outdoor backdrop, gives the portrait a vintage ambience, making it an exquisite piece of portrait photography.",
//         styleId: 2,
//         thumbnails: "arts/JP-17-0027/thumbnails/JP-17-0027.jpg",
//         glb_file_3d: "JP-17-0027.glb",
//         video: "JP-17-0027.mp4",
//         photo: [
//           "arts/JP-17-0027/gallery/JP-17-0027-1.jpg",
//           "arts/JP-17-0027/gallery/JP-17-0027-2.jpg",
//           "arts/JP-17-0027/gallery/JP-17-0027-3.jpg",
//         ],
//         userId: 1,
//         set_of: 1,
//         product_img: [
//           "arts/JP-17-0027/photos/JP-17-0027_1.jpg",
//           "arts/JP-17-0027/photos/JP-17-0027_2.jpg",
//           "arts/JP-17-0027/photos/JP-17-0027_3.jpg",
//           "arts/JP-17-0027/photos/JP-17-0027.jpg",
//         ],
//         in_stock: true,
//         categoryId: 1,
//         packaging: [
//           { size: 2, img: "arts/JP-17-0027/frame/JP-17-0027-1.jpg" },
//           { size: 3, img: "arts/JP-17-0027/frame/JP-17-0027-2.jpg" },
//         ],
//         frameSizeId: 1,
//         weight: 2,
//       },
//     ],
//   });
// }

// initialArtworkSeed()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
