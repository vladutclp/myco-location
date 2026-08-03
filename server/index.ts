import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const PORT = 8080;
const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("server started at port ", PORT);
});
