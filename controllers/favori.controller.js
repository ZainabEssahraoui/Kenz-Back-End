const Favori = require("../models/Favori");
const User = require("../models/User");
const Opportunite = require("../models/Opportunite");


/* ===========================
   AJOUTER UN FAVORI
=========================== */
exports.addFavori = async (req, res) => {
  try {
    // Vérifier que l'utilisateur est authentifié via token
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    const userId = req.user.id;

    const { opportuniteId } = req.body;
    if (!opportuniteId) {
      return res.status(400).json({ message: "opportuniteId requis" });
    }

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Vérifier que l'opportunité existe
    const opportunite = await Opportunite.findById(opportuniteId);
    if (!opportunite) return res.status(404).json({ message: "Opportunité non trouvée" });

    // Créer le favori
    const favori = new Favori({ user: userId, opportunite: opportuniteId });
    await favori.save();

    res.status(201).json({ message: "Favori ajouté", favori });

  } catch (error) {
    // Déjà dans les favoris
    if (error.code === 11000) {
      return res.status(400).json({ message: "Déjà dans les favoris" });
    }
    console.error("Erreur addFavori:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


/* ===========================
   GET FAVORIS D'UN UTILISATEUR
=========================== */
exports.getUserFavoris = async (req, res) => {
  try {
    const { userId } = req.params;

    const favoris = await Favori.find({ user: userId })
      .populate("user")          // populé info utilisateur
      .populate("opportunite");  // populé info opportunité

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
    const { id } = req.params;

    const favori = await Favori.findByIdAndDelete(id);
    if (!favori) return res.status(404).json({ message: "Favori non trouvé" });

    res.json({ message: "Favori supprimé", favoriId: id });
  } catch (error) {
    console.error("Erreur removeFavori:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
