const mongoose = require("mongoose");

const CommentaireSchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  date: { type: Date, default: Date.now },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opportunite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunite",
    required: true,
  },
});

module.exports = mongoose.model("Commentaire", CommentaireSchema);
