const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profile: {
    educationLevel: {
      type: String,
      required: function () { return this.role === "user"; }
    },
    studyDomain: {
      type: String,
      required: function () { return this.role === "user"; }
    },
    phone: String,
    destinationContinent: String,
    secondaryDomain: String
  },
  profileCompletion: Number
});

// Supprimer profileCompletion pour admin 
userSchema.pre("save", async function () {
  if (this.role === "admin") {
    this.profileCompletion = undefined;
  }
});

module.exports = mongoose.model("User", userSchema);
