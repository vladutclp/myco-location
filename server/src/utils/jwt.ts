import { SignJWT, type JWTPayload, jwtVerify } from "jose";
import { createSecretKey } from "crypto";
import env from "../../env.ts";

const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");

export interface JwtPayload extends JWTPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: JwtPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secretKey);
};

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secretKey);

  return payload as JwtPayload;
};
