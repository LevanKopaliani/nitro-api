import { PrismaClient } from "@prisma/client";
import generateJwt from "~/utils/generateJwt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const menu = await prisma.menus.create({
      data: {
        ...body,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "menu created",
      data: menu,
    };
  } catch (error) {
    throw new Error(error);
  }
});
