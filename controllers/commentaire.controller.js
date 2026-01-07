const Commentaire = require("../models/Commentaire.controller.js");

// Ajouter un commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const commentaire = new Commentaire(req.body);
    await commentaire.save();
    res.status(201).json(commentaire);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les commentaires pour une opportunité
exports.getCommentairesByOpportunite = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ opportunite: req.params.id })
      .populate("utilisateur", "firstName lastName email")
      .populate("opportunite", "titre");
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer tous les commentaires d’un utilisateur
exports.getCommentairesByUser = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({
      utilisateur: req.params.id,
    }).populate("opportunite", "titre description");
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
