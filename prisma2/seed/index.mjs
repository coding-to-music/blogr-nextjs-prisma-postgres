// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@internal/prisma/client/index.js";

const prisma = new PrismaClient();

// const Users = require("./data/users");
// const Posts = require("./data/posts");
const Streets = require("./data/streets");

// auto-generate the int id
// length and width to int
// computed total-length
// computed total-width
// computed total-area

async function runSeeders() {
  console.log(`Deleting existing records ...`);
  const deleteUsers = await prisma.street.deleteMany({});

  console.log(`Start seeding ...`);
  for (const s of Streets) {
    const street = await prisma.street.create({
      data: s,
    });
    // console.log(`Created street with id: ${street.id} ${street.name}`);
  }
  console.log(`Seeding finished.`);
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });

// async function main() {
//   console.log(`Start seeding ...`)
//   for (const u of userData) {
//     const user = await prisma.user.create({
//       data: u,
//     })
//     console.log(`Created user with id: ${user.id}`)
//   }
//   console.log(`Seeding finished.`)
// }

// async function runSeeders() {
//   // Streets
//   await Promise.all(
//     Streets.map(async (street) =>
//       prisma.street.upsert({
//         where: { id: street.id },
//         update: {},
//         create: street,
//       })
//     )
//   );

// Users
// await Promise.all(
//   Users.map(async (user) =>
//     prisma.user.upsert({
//       where: { id: user.id },
//       update: {},
//       create: user,
//     })
//   )
// );

// Posts
// await Promise.all(
//   Posts.map(async (post) =>
//     prisma.post.upsert({
//       where: { id: post.id },
//       update: {},
//       create: post,
//     })
//   )
// );
// }
