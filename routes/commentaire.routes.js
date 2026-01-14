const express = require("express");
const router = express.Router();

const {
  createCommentaire,
  getCommentairesByOpportunite,
  deleteCommentaire,
} = require("../controllers/commentaire.controller");

const { auth } = require("../middlewares/auth"); // Import middleware auth

// Créer un commentaire → protégé
router.post("/:opportuniteId", auth, createCommentaire);

// Récupérer les commentaires d'une opportunité → public (ou auth si tu veux)
router.get("/opportunite/:opportuniteId", getCommentairesByOpportunite);

// Supprimer un commentaire → protégé
router.delete("/:id", auth, deleteCommentaire);

module.exports = router;
