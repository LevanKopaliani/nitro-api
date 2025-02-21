import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export default function generateJwt(user: Partial<User>): string {
  const { JWT_TOKEN } = useRuntimeConfig();
  return jwt.sign({ email: user.email }, JWT_TOKEN, { expiresIn: "24h" });
}
