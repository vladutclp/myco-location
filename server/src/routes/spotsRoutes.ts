import { Router } from "express";
import { authenticateToken } from "../middleware/auth.ts";
import {
  createSpot,
  deleteSpot,
  getAllSpots,
  getSpotById,
  updateSpot,
} from "../controllers/spotsController.ts";

const router = Router();

router.use(authenticateToken);

router.get("/", getAllSpots);

router.get("/:id", getSpotById);

router.post("/", createSpot);

router.delete("/:id", deleteSpot);

router.patch("/:id", updateSpot);

export default router;
