// models/Formation.js
const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const FormationSchema = new mongoose.Schema({
  etablissement: String,
  frais: {
    type: Number,
    default: 0
  },
  mode_apprentissage: {
    type: String,
    enum: [" distance", "presentiel"],
  },
  statut_financier: {
    type: String,
    enum: ["free", "paid"],
  },
  duree: String
  
});

module.exports = Opportunite.discriminator("Formation", FormationSchema);
