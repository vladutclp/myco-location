import { SignJWT, type JWTPayload, jwtVerify } from "jose";
import { createSecretKey } from "crypto";

export interface JwtPayload extends JWTPayload {
  id: number;
  email: string;
}
const SECRET = "my-super-secret";

export const generateToken = (payload: JwtPayload) => {
  const secretKey = createSecretKey(SECRET, "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
};

export const verifyToken = async (token: string) => {
  const secretKey = createSecretKey(SECRET, "utf-8");
  const { payload } = await jwtVerify(token, secretKey);

  return payload as JwtPayload;
};
