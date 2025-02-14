import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async () => {
  const prisma = new PrismaClient();

  async function getData() {
    // return await prisma.user.create({
    //   data: {
    //     name: "Admin",
    //     email: "rame@prisma.io",
    //     posts: {
    //       create: [
    //         {
    //           title: "Join the Prisma Discord",
    //           content: "https://pris.ly/discord",
    //           published: true,
    //         },
    //       ],
    //     },
    //   },
    // });
    return await prisma.user.findMany();
  }

  const user = await getData().then();

  return user;
  //   const db = useDatabase();
  //   console.log("gaiara");
  // Create users table
  //   await db.sql`DROP TABLE IF EXISTS users`;
  //   await db.sql`CREATE TABLE IF NOT EXISTS users ("id" TEXT PRIMARY KEY, "firstName" TEXT, "lastName" TEXT, "email" TEXT)`;
  // Add a new user
  //   const userId = String(Math.round(Math.random() * 10_000));
  //   await db.sql`INSERT INTO users VALUES (${userId}, 'John', 'Doe', '')`;
  // Query for users
  //   const { rows } = await db.sql`SELECT * FROM users WHERE id = ${userId}`;
  //   const { rows } = await db.sql`SELECT * FROM users`;
  //   console.log(rows);
  //   return {
  //     rows,
  //   };
});
