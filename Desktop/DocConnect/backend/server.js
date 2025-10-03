import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../backend/config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import { doctorRouter } from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors());
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
