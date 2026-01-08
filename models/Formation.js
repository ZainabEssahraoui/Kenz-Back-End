// models/Formation.js
const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const FormationSchema = new mongoose.Schema({
  //value
  montant:{ type: Number }, 
  //add this 
  mode_apprentissage: {
    type: String,
    enum: ["distance", "presentiel"]
  },
  // add this 
  statut_financier: {
    type: String,
    enum: ["free", "paid"]
  }
  
});

module.exports = Opportunite.discriminator("Formation", FormationSchema);
