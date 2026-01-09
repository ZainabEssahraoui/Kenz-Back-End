const User = require("../models/User");

/* AFFICHER TOUS LES USERS (ADMIN SEULEMENT) */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // sécurité
      .sort({ _id: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* SUPPRIMER UN USER (ADMIN SEULEMENT) */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔒 Empêcher suppression admin
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Impossible de supprimer un admin" });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "User supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
