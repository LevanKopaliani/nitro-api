import type { H3Event } from "h3";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  console.log(body);
  return {};
  // try {
  //   const user = await prisma.user.create({
  //     data: {
  //       ...body,
  //     },
  //   });
  // } catch (error) {
  //   setResponseStatus(event, 500, "email or username not unique");
  //   return "email or username not unique";
  // }
});
