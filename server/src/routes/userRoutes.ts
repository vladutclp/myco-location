import { Router } from "express";
import prisma from "../../prisma.service.ts";

const router = Router();

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
