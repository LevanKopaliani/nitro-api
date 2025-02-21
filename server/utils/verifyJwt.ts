import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export default function verifyJwt(token: string) {
  const { JWT_TOKEN } = useRuntimeConfig();

  return jwt.verify(token, JWT_TOKEN);
}
