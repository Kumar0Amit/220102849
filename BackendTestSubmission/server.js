import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import requestLogger from "../LoggingMiddleware/requestLogger.js"; // middleware
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use("/", urlRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
