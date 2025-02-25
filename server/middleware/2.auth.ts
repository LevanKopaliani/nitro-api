import type { H3Event } from "h3";
import { PrismaClient, User } from "@prisma/client";
import verifyJwt from "~/utils/verifyJwt";

const prisma = new PrismaClient();

// interface ExtendedH3Event extends H3Event {
//   user: User;
// }

export default defineEventHandler(async (event: H3Event) => {
  if (event.path?.includes("auth")) return;

  const cookie = getCookie(event, "accessToken");
  console.log("coookie----------------------------", cookie);

  const headers = getHeaders(event);
  if (!headers.authorization) throw new Error("Unauthorized");

  const token = headers.authorization?.split(" ")?.[1];
  if (!token) throw new Error("Token Not Found");

  try {
    const decode = verifyJwt(token) as { email: string };
    if (!decode) {
      throw new Error("decode error");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: decode.email,
      },
    });

    if (!user) {
      throw new Error("no such user");
    }
  } catch (error) {
    throw new Error(error);
  }
});
