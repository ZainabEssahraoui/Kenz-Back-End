const Favori = require("../models/Favori");
const User = require("../models/User");
const Opportunite = require("../models/Opportunite");

/* ===========================
   AJOUTER UN FAVORI
=========================== */
exports.addFavori = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const userId = req.user.id;
    const { opportuniteId } = req.body;

    if (!opportuniteId) {
      return res.status(400).json({ message: "opportuniteId requis" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const opportunite = await Opportunite.findById(opportuniteId);
    if (!opportunite) {
      return res.status(404).json({ message: "Opportunité non trouvée" });
    }

    const favori = new Favori({
      user: userId,
      opportunite: opportuniteId
    });

    await favori.save();

    res.status(201).json({
      message: "Favori ajouté",
      favori
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Déjà dans les favoris" });
    }
    console.error("Erreur addFavori:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ===========================
   GET MES FAVORIS
=========================== */
exports.getUserFavoris = async (req, res) => {
  console.log("req.user:", req.user);  // <<-- debug
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const userId = req.user.id;

    const favoris = await Favori.find({ user: userId })
      .populate("opportunite");

    res.json(favoris);
  } catch (error) {
    console.error("Erreur getUserFavoris:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ===========================
   SUPPRIMER UN FAVORI
=========================== */
exports.removeFavori = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const userId = req.user.id;
    const { id } = req.params;

    const favori = await Favori.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!favori) {
      return res.status(404).json({
        message: "Favori non trouvé ou accès refusé"
      });
    }

    res.json({
      message: "Favori supprimé",
      favoriId: id
    });
  } catch (error) {
    console.error("Erreur removeFavori:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
