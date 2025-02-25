import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const body = await readBody(event);

  try {
    const menus = await prisma.menus.findMany();

    return {
      statusCode: 200,
      success: true,
      data: { ...menus },
    };
  } catch (error) {
    throw new Error(error);
  }
});
