import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import usersRouter from "./routes/userRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import spotsRoutes from "./routes/spotsRoutes.ts";
import helmet from "helmet";

export const PORT = 8080;
const app: Express = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRouter);
app.use("/api/spots", spotsRoutes);

export default app;
