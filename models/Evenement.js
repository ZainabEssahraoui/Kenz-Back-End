// models/Evenement.js
const Opportunite = require("./Opportunite");
const mongoose = require("mongoose");

const EvenementSchema = new mongoose.Schema({
/* add these */
  lieu: { type: String }
  
});

module.exports = Opportunite.discriminator("Evenement", EvenementSchema);
