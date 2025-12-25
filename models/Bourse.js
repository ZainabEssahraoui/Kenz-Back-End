const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const BourseSchema = new mongoose.Schema({
  montant: Number,
  eligibilite: String,
  organisme: String,
});

module.exports = Opportunite.discriminator("Bourse", BourseSchema);
