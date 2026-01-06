const express = require("express");
const router = express.Router();
const controller = require("../controllers/opportunite.controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/formations/filter", controller.filterFormations);

router.get("/search", controller.searchByTitre);
router.get("/:id", controller.getDetails);

router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
