import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";

const PORT = 8080;
const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("server started at port ", PORT);
});
