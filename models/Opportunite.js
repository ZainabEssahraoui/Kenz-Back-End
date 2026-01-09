const mongoose = require("mongoose");

const options = {
  discriminatorKey: "type", // important
  timestamps: true
};

const OpportuniteSchema = new mongoose.Schema(
  {
    titre: { type: String },
    description: { type: String },

    image: { type: String }, // imageUrl
    logo: { type: String },  // logoUrl

    lienSource: { type: String },//add this
    lienOrganisation: { type: String },//add this

    organisme: { type: String },//organization
    orgDescription: { type: String },

    eligibility: { type: String },
    benefits: { type: String },

    language: { type: String },
    Duration: { type: String },
    filiere:  { type: String},//subject 
    dateDebut:  { type: Date },//deadLine
    dateLimite: { type: Date },//add this 
    pays: { type: String }//location
  },
  options
);

module.exports = mongoose.model("Opportunite", OpportuniteSchema,
  "opportunites");
