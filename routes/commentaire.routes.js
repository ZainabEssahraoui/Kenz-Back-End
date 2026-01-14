const express = require("express");
const router = express.Router();

const {
  createCommentaire,
  getCommentairesByOpportunite,
  deleteCommentaire,
} = require("../controllers/commentaire.controller");

// Temporarily skip auth middleware for testing
// const authMiddleware = require("../middlewares/auth.js");

// Créer un commentaire
router.post("/:opportuniteId", createCommentaire);

// Récupérer les commentaires d'une opportunité
router.get("/opportunite/:opportuniteId", getCommentairesByOpportunite);

// Supprimer un commentaire
router.delete("/:id", deleteCommentaire);

module.exports = router;
