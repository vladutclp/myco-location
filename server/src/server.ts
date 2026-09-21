import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import usersRouter from "./routes/userRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import spotsRoutes from "./routes/spotsRoutes.ts";
import compression from "compression";
import helmet from "helmet";
import healthCheckRoutes from "./routes/healthCheckRoute.ts";

export const PORT = 8080;
const app: Express = express();

app.use(compression());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", healthCheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRouter);
app.use("/api/spots", spotsRoutes);

export default app;
