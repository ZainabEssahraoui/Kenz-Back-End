const Commentaire = require("../models/commentaire.model");
const Opportunite = require("../models/Opportunite.js");

// Créer un commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const { contenu } = req.body;
    const { opportuniteId } = req.params;
    const utilisateurId = req.user.id; // vient du middleware auth

    if (!contenu) {
      return res.status(400).json({ message: "Le contenu est obligatoire" });
    }

    // vérifier si l'opportunité existe
    const opportunite = await Opportunite.findById(opportuniteId);
    if (!opportunite) {
      return res.status(404).json({ message: "Opportunité introuvable" });
    }

    const commentaire = await Commentaire.create({
      contenu,
      utilisateur: utilisateurId,
      opportunite: opportuniteId,
    });

    res.status(201).json(commentaire);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les commentaires d'une opportunité
exports.getCommentairesByOpportunite = async (req, res) => {
  try {
    const { opportuniteId } = req.params;

    const commentaires = await Commentaire.find({ opportunite: opportuniteId })
      .populate("utilisateur", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
  try {
    const commentaire = await Commentaire.findById(req.params.id);

    if (!commentaire) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }

    // seul l'auteur peut supprimer
    if (commentaire.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    await commentaire.deleteOne();

    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
