// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function initialSeed() {
//   await prisma.role.create({
//     data: {
//       name: "super_admin",
//     },
//   });

//   await prisma.role.create({
//     data: {
//       name: "admin",
//     },
//   });
//   await prisma.role.create({
//     data: {
//       name: "customer",
//     },
//   });

//   await prisma.role.create({
//     data: {
//       name: "artist",
//     },
//   });

//   await prisma.company.create({
//     data: {
//       company: "1Click Design",
//     },
//   });

//   await prisma.company.create({
//     data: {
//       company: "1Click Design",
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "admin@1clickdesign.com",
//       first_name: "Super",
//       last_name: "Admin",
//       password: "$2b$10$/E9shjK.I4Oqtlg75NPEcOVBp6Bquyea.VkwRxbTP7R0qpN.f.gsW",
//       roleId: 1,
//       job_title: "Developer",
//       is_email_verified: true,
//       company: { connect: { id: 1 } },
//     },
//   });

//   await prisma.address.create({
//     data: {
//       companyId: 1,
//       city: "Quezon City",
//       country: "Philippines",
//       postal_code: "1116",
//       phone_number: 12345678,
//       state: "Novaliches",
//       address_1: "Novaliches, QC",
//       address_2: "Bulacan",
//       userId: 1,
//     },
//   });

//   await prisma.shippingAddress.create({
//     data: {
//       companyId: 2,
//       city: "Quezon City",
//       country: "Philippines",
//       postal_code: "1116",
//       phone_number: 12345678,
//       state: "Novaliches",
//       address_1: "Novaliches, QC",
//       address_2: "Bulacan",
//       same_with_Address: true,
//       address: { connect: { id: 1 } },
//       userId: 1,
//     },
//   });

//   await prisma.category.createMany({
//     data: [
//       {
//         name: "Acrylic",
//       },
//       {
//         name: "NFT",
//       },
//     ],
//   });

//   await prisma.style.createMany({
//     data: [
//       {
//         name: "Architectural",
//       },
//       {
//         name: "Figure",
//       },
//       {
//         name: "Animals",
//       },
//       {
//         name: "Landscape",
//       },
//       {
//         name: "Sea & Sky",
//       },
//       {
//         name: "Abstract",
//       },
//       {
//         name: "City",
//       },
//       {
//         name: "Cartoon",
//       },
//       {
//         name: "Creative",
//       },
//       {
//         name: "Plants",
//       },
//       {
//         name: "Artists",
//       },
//     ],
//   });

//   await prisma.frameSize.create({
//     data: {
//       name: "90 x 60 x 2",
//       width: 90,
//       height: 60,
//       depth: 2,
//     },
//   });
// }

// initialSeed()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
