import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.ts";

const router = Router();

router.get("/health", healthCheck);

export default router;
