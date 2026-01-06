const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const BourseSchema = new mongoose.Schema({
  montant: Number,
  filiere: {
    type: String,
  },
  niveau_academique: {
    type: String,
    enum: [
      "Licence",
      "Master",
      "Doctorat",
      "Ingénieur"
    ] 
  }, 
  organisme: String
});

module.exports = Opportunite.discriminator("Bourse", BourseSchema);
