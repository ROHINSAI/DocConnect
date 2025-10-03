import express from "express";
import {
  bookAppointment,
  getProfile,
  getUserAppointments,
  loginUser,
  registerUser,
  updateProfile,
  cancelAppointment,
} from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.put(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments/:userId", authUser, getUserAppointments);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
