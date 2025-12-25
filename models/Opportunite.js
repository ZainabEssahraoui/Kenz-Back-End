// models/Opportunite.js
const mongoose = require("mongoose");

const options = {
  discriminatorKey: "type", // important
  timestamps: true,
};

const OpportuniteSchema = new mongoose.Schema(
  {
    titre: { type: String },
    description: { type: String },
    image: { type: String }, // pour Angular
    lienSource: String,
    dateLimite: Date,
    pays: String,
  },
  options
);

module.exports = mongoose.model("Opportunite", OpportuniteSchema);
