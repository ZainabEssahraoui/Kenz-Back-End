const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { auth, isAdmin } = require("../middlewares/auth");

// 🔐 ADMIN ONLY
router.get("/users", auth, isAdmin, adminController.getAllUsers);
router.delete("/users/:id", auth, isAdmin, adminController.deleteUser);

module.exports = router;
