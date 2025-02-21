import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import generateJwt from "~/utils/generateJwt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);

  const token = headers.authorization?.split(" ")?.[1];

  if (!token) {
    throw createError({
      cause: "auth token not provided",
      statusCode: 500,
      message: "Token Not Found 1",
      statusMessage: "Token Not Found 2",
    });
    // throw new Error("Token Not Found");
  }

  try {
    const decode = verifyJwt(token) as { email: string };

    const user = await prisma.user.findUnique({
      where: {
        email: decode.email,
      },
    });

    if (!user) {
      throw new Error("no such user");
    }
    const { password: _password, ...userWidouthPassword } = user;

    return {
      statusCode: 200,
      success: true,
      message: "Login successful",
      user: { ...userWidouthPassword },
      token: generateJwt(user),
    };
  } catch (error) {
    throw new Error(error);
  }
});
