import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const body = await readBody(event);

  try {
    const settings = await prisma.siteconfig.findFirst({
      omit: {
        id: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    if (settings) {
      return {
        statusCode: 200,
        success: true,
        data: settings,
      };
    } else {
      return {
        statusCode: 200,
        success: false,
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
});
