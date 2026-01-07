const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filter.controller");

// Bourse filter route
router.get("/bourses", filterController.filterBourses);

// Evenement filter route
router.get("/evenements", filterController.filterEvenements);
//formation filtre route
router.get("/formations", filterController.filterFormations);
//serch opportunité
router.get("/search", filterController.searchByTitre);

module.exports = router;
