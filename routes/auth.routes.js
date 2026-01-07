const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth");

/* Auth */
router.post("/register", authController.register); // public
router.post("/login", authController.login);       // public

/* Logout */
router.post("/logout", auth, authController.logout); // protégé

/* Profile */
router.post("/profile", auth, authController.completeProfile); // protégé
router.put("/profile/:userId", auth, authController.updateProfile); // protégé

/* User */
router.get("/user/:id", auth, authController.getUser); // protégé

module.exports = router;
