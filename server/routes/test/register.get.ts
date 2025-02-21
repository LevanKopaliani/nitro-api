import type { H3Event } from "h3";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  // const body = await readBody(event);
  // console.log(body);
  const ip = getRequestIP(event);
  const url = getRequestURL(event);
  console.log(event.node.req);
  return [
    event.path,
    event.method,
    event.headers,
    event.context,
    event.handled,
    event.headers,
    ip,
    url,
  ];
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
