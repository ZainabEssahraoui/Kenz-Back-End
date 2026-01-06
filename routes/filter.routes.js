const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filter.controller");

// Bourse filter route
router.get("/bourses", filterController.filterBourses);

// Evenement filter route
router.get("/evenements", filterController.filterEvenements);

module.exports = router;
