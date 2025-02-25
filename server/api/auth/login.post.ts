import type { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import generateJwt from "~/utils/generateJwt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  console.log("----------------------------body", body);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return {
        statusCode: 401,
        body: { success: false, message: "Invalid username or password" },
      };

      // throw new Error("no such user");
    }

    const isPasswordCorrect = await compare(body.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("incorrect Password");
    }

    const { password: _password, ...userWidouthPassword } = user;

    setResponseHeader(event, "Authorization", generateJwt(user));
    setCookie(event, "Authtoken", generateJwt(user));

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
