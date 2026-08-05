import { PrismaPg } from "@prisma/adapter-pg";
import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.ts";

const router = Router();
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      spots: true,
    },
  });
  res.json({ users });
  res.statusCode = 200;
});

router.get("/:id", (req, res) => {
  res.send("Get a specific user");
});

router.put("/:id", (req, res) => {
  res.send("Update user");
});

router.delete("/:id", (req, res) => {
  res.send("Delete user");
});

export default router;
