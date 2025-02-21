import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controller/auth/userController.js";
import { adminMiddleware, protect } from "../middleware/authMiddleware.js";
import { deleteUser } from "../controller/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

//admin routes

router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

export default router;
