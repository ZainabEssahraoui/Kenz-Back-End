// models/Evenement.js
const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const EvenementSchema = new mongoose.Schema({
  lieu: String,
  dateDebut: Date,
  dateFin: Date
});

module.exports = Opportunite.discriminator("Evenement", EvenementSchema);
