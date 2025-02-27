import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const body = await readBody(event);
  const menuId = getRouterParam(event, "id");

  try {
    // if deletind parent menu, (cascade) delete childs too
    const menu = await prisma.menus.deleteMany({
      where: {
        OR: [
          { id: +menuId },
          {
            pid: +menuId,
          },
        ],
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "menu deleted",
      data: [menu],
    };
  } catch (error) {
    throw new Error(error);
  }
});
