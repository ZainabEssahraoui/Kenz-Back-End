const mongoose = require("mongoose");

const commentaireSchema = new mongoose.Schema(
  {
    contenu: {
      type: String,
      required: true,
      trim: true
    },

    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ou "Utilisateur" selon ton projet
      required: true
    },

    opportunite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunite",
      required: true
    }
  },
  {
    timestamps: true // crée automatiquement createdAt et updatedAt
  }
);

module.exports = mongoose.model("Commentaire", commentaireSchema);
