const express = require("express");
const router = express.Router();
const controller = require("../controllers/opportunite.controller");
const { auth, isAdmin } = require("../middlewares/auth");

// Routes publiques
router.get("/", controller.getAll);
router.get("/:id", controller.getDetails);

// Routes admin seulement

router.post("/", auth, isAdmin, controller.create);
router.put("/:id", auth, isAdmin, controller.update);
router.delete("/:id", auth, isAdmin, controller.remove); 


module.exports = router;
