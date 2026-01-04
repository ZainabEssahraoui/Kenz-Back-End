const express = require("express");
const router = express.Router();
const favoriController = require("../controllers/favori.controller");
const auth = require("../middlewares/auth");

// Ajouter un favori (maintenant sécurisé)
router.post("/", auth, favoriController.addFavori);

// Afficher tous les favoris d’un user
router.get("/:userId", auth, favoriController.getUserFavoris);

// Supprimer un favori
router.delete("/:id", auth, favoriController.removeFavori);

module.exports = router;
