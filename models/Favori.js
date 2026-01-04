const mongoose = require("mongoose");

const favoriSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    opportunite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunite",
      required: true
    },
    dateAjout: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// empêcher le même favori 2 fois
favoriSchema.index({ user: 1, opportunite: 1 }, { unique: true });

module.exports = mongoose.model("Favori", favoriSchema);
