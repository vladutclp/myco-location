import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JwtPayload } from "../utils/jwt.ts";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Bad Request!" });
    }

    req.user = await verifyToken(token);
    return next();
  } catch (e) {
    return res.status(403).json({ message: "Something went wrong" });
  }
};
