import { Router } from "express";
import { authenticateToken } from "../middleware/auth.ts";

const router = Router();

router.use(authenticateToken);

router.get("/", (req, res) => {
  res.send("Get all spots");
});

router.get("/:id", (req, res) => {
  res.send("Get a specific spot");
});

router.post("/", (req, res) => {
  res.send("Create new spot");
});

router.post("/:id", (req, res) => {
  res.send("Delete spot");
});

export default router;
