import type { Request, Response } from "express";
import prisma from "../../prisma.service.ts";
import { hashPassword, isValidPassword } from "../utils/passwords.ts";
import { Prisma } from "../../generated/prisma/client.ts";
import { generateToken } from "../utils/jwt.ts";

export const registerUser = async (
  req: Request<unknown, unknown, Prisma.UserCreateInput>,
  res: Response,
) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, firstName, lastName },
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    const token = await generateToken({
      id: user.id,
      email: user.email,
    });

    return res
      .status(201)
      .json({
        message: "User successfully created",
        user,
        token,
      })
      .end();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //Duplicate email error code
      //TODO - handle this differently, giving away the information that
      //an email already exists is not a good security practice(from OAuth2 security article)
      if (e.code === "P2002") {
        return res.status(409).json({ message: "User already exists" }).end();
      }
    }
    res.status(500).json({ message: "Something went wrong" }).end();
  }
};

export const loginUser = async (
  req: Request<unknown, unknown, Prisma.UserCreateInput>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await isValidPassword(password, user?.password ?? "");
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    }).end;
  } catch (e) {
    console.error("Login error", e);
    return res.status(500);
  }
};
