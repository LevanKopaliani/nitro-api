import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const menu = await prisma.menus.update({
      where: {
        id: body.id,
      },
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
