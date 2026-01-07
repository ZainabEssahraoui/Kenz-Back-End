// routes/commentaire.routes.js

const express = require("express");
const router = express.Router();
const Commentaire = require("../models/commentaire.js");

// Ajouter un commentaire
router.post("/", async (req, res) => {
  try {
    const nouveauCommentaire = new Commentaire(req.body);
    const commentaireSauve = await nouveauCommentaire.save();
    res.status(201).json(commentaireSauve);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer tous les commentaires pour une opportunité
router.get("/opportunite/:id", async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ opportunite: req.params.id })
      .populate("utilisateur", "firstName lastName email")
      .populate("opportunite", "titre");
    res.status(200).json(commentaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer tous les commentaires d’un utilisateur
router.get("/utilisateur/:id", async (req, res) => {
  try {
    const commentaires = await Commentaire.find({
      utilisateur: req.params.id,
    }).populate("opportunite", "titre description");
    res.status(200).json(commentaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
