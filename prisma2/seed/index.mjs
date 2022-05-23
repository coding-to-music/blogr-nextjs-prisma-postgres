// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@internal/prisma/client/index.js";

const prisma = new PrismaClient();

import Streets from "./data/streets.js";

// auto-generate the int id
// length and width to int
// computed total-length
// computed total-width
// computed total-area

let insertedRows = 0;

async function runSeeders() {
  console.log(`Deleting existing records ...`);
  const deleteUsers = await prisma.street.deleteMany({});
  console.log(`Deleted Rows: `, deleteUsers);

  console.log(`Start seeding ...`);
  for (const s of Streets) {
    const street = await prisma.street.create({
      data: s,
    });

    insertedRows++;

    // console.log(`Created street with id: ${street.id} ${street.name}`);
  }
  console.log(`Seeding finished, new row count is `, insertedRows);

  // const insertedUsers = await prisma.street.deleteMany({});
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
