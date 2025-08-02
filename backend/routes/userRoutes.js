const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.get("/", isAuthenticated, getAllUsers);
router.put("/:id", isAuthenticated, updateUser);
router.delete("/:id", isAuthenticated, deleteUser);

module.exports = router;
