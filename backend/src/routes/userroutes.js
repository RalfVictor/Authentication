import express from "express";
import {
  changePassword,
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  userLoginStatus,
  verifyEmail,
  verifyUser,
} from "../controller/auth/userController.js";
import {
  adminMiddleware,
  creatorMiddleware,
  protect,
} from "../middleware/authMiddleware.js";
import { deleteUser, getAllUsers } from "../controller/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

//admin routes

router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

//get all users
router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

//login status
router.get("/login-status", userLoginStatus);

//email verifiication
router.post("/verify-email", protect, verifyEmail);

//verify user
router.patch("/verify-user/:verificationToken", verifyUser);

//forgot password
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:resetPasswordToken", resetPassword);

router.patch("/change-password", protect, changePassword);

export default router;
