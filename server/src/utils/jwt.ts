import { SignJWT, type JWTPayload, jwtVerify } from "jose";
import { createSecretKey } from "crypto";

const getJwtToken = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT must be passed");
  }

  return jwtSecret;
};

export interface JwtPayload extends JWTPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: JwtPayload) => {
  const secretKey = createSecretKey(getJwtToken(), "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
};

export const verifyToken = async (token: string) => {
  const secretKey = createSecretKey(getJwtToken(), "utf-8");

  const { payload } = await jwtVerify(token, secretKey);

  return payload as JwtPayload;
};
