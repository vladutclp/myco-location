import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.ts";
import { validateBody } from "../middleware/validation.ts";
import type { Prisma } from "../../generated/prisma/client.ts";
import { z } from "zod";

const registerUserSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
});

const loginUserSchema = z.object({
  email: z.email("Email is required"),
  password: z.string("Password is required").min(6),
});

const router = Router();

router.post("/register", validateBody(registerUserSchema), registerUser);
router.post("/login", validateBody(loginUserSchema), loginUser);

export default router;
