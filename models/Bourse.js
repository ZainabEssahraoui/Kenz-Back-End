const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const BourseSchema = new mongoose.Schema({
  //value
  montant:{ type: Number }, 
  //level 
  niveau_academique: {
    type: String,
    enum: [
      "Licence",
      "Master",
      "Doctorat",
      "Ingénieur"
    ] 
  }
});

module.exports = Opportunite.discriminator("Bourse", BourseSchema);
