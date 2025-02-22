import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userLoginStatus,
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
router.post("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

//admin routes

router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

//get all users
router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

//login status
router.get("/login-status", userLoginStatus);

export default router;
