import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const settings = await prisma.siteconfig.upsert({
      where: {
        id: 0,
      },
      omit: {
        id: true,
        updatedAt: true,
        createdAt: true,
      },
      update: {
        ...body,
      },
      create: {
        id: 0,
        website_title: "",
        website_slogan: "",
        website_description: "",
        website_meta_title: "",
        website_meta_description: "",
        website_meta_keywords: "",
        website_rekaptcha_key: "",
        website_google_maps_key: "",
      },
    });

    return {
      statusCode: 200,
      success: true,
      data: settings,
    };
  } catch (error) {
    throw new Error(error);
  }
});
