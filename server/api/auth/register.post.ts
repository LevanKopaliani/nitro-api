import type { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import generateJwt from "~/utils/generateJwt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);

  // const formData = await readFormData(event);
  // const email = formData.get("email");
  // const password = formData.get("password");

  try {
    const hashedPassword = await hash(body?.password, 10);

    const test = generateJwt({
      email: "test@mail.ru",
      firstName: "test",
      lastName: "test",
    });
    return test;

    // const user = await prisma.user.create({
    //   data: { ...body, password: hashedPassword },
    // });
    // const { password: _password, ...userWidouthPassword } = user;

    // return userWidouthPassword;
  } catch (error) {
    throw new Error(error);
  }

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
