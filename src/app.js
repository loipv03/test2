import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/product";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);

try {
  mongoose.connect(process.env.DATABASE_URL);
} catch (error) {
  throw error;
}

export const viteNodeApp = app;
