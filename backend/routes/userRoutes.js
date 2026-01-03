import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();

router.get("/", isAuthenticated, getAllUsers);
router.put("/:id", isAuthenticated, updateUser);
router.delete("/:id", isAuthenticated, deleteUser);

export default router;
