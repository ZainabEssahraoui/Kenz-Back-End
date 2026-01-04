const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");

/* Auth */
router.post("/register", authController.register);
router.post("/login", authController.login);


/* Logout */
router.post("/logout", (req, res) => {
  res.json({
    message: "Déconnecté avec succès",
    redirect: "/home"
  });
});

/* Profile */
router.post("/profile", auth, authController.completeProfile);
router.put("/profile/:userId", auth, authController.updateProfile);

/* User */
router.get("/user/:id", auth, authController.getUser);
module.exports = router;
