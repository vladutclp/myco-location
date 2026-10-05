import { Router } from "express";
import { authenticateToken } from "../middleware/auth.ts";
import {
  createSpot,
  deleteSpot,
  getAllSpots,
  getSpotById,
  updateSpot,
} from "../controllers/spotsController.ts";
import { validateBody, validateParams } from "../middleware/validation.ts";
import {
  createSpotSchema,
  spotParamsSchema,
  updateSpotSchema,
} from "../schemas/spot.schema.ts";

const router = Router();

router.use(authenticateToken);

router.get("/", getAllSpots);

router.get("/:id", validateParams(spotParamsSchema), getSpotById);

router.post("/", validateBody(createSpotSchema), createSpot);

router.delete("/:id", validateParams(spotParamsSchema), deleteSpot);

router.patch(
  "/:id",
  validateParams(spotParamsSchema),
  validateBody(updateSpotSchema),
  updateSpot,
);

export default router;
