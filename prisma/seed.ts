import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // clean up
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  const joey = await prisma.user.create({
    data: {
      email: "joey@zenstack.dev",
      password: "Joey",
    },
  });
  console.log("User created:", joey);

  const rachel = await prisma.user.create({
    data: {
      email: "rachel@zenstack.dev",
      password: "Rachel",
    },
  });
  console.log("User created:", rachel);

  const joeyPost = await prisma.post.create({
    data: {
      name: "Joey's Post",
      published: false,
      createdById: rachel.id,
    },
  });
  console.log("Space created:", joeyPost);

  const rachelPost = await prisma.post.create({
    data: {
      name: "Rachel's Post",
      published: false,
      createdById: rachel.id,
    },
  });
  console.log("Space created:", rachelPost);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
