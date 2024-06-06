import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRouter from "./users/users";
import antelopeRouter from "./antelope/antelope";

export const app = express();
export const prisma = new PrismaClient();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const port = process.env.API_PORT;

app.use("/users", userRouter);
app.use("/antelope", antelopeRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
