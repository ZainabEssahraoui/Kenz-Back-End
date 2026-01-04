// models/Formation.js
const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const FormationSchema = new mongoose.Schema({
  etablissement: String,
  frais: Number,
  duree: String
});

module.exports = Opportunite.discriminator("Formation", FormationSchema);
