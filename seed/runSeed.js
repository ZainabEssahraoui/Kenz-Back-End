const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Opportunite = require("../models/Opportunite");
const Bourse = require("../models/Bourse");
const Formation = require("../models/Formation");
const Evenement = require("../models/Evenement");

const data = require("./opportunites.seed");

dotenv.config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    await Opportunite.deleteMany({});
    console.log(" Old data removed");

    const bourses = data.filter(d => d.type === "Bourse");
    const formations = data.filter(d => d.type === "Formation");
    const evenements = data.filter(d => d.type === "Evenement");

    await Bourse.insertMany(bourses);
    await Formation.insertMany(formations);
    await Evenement.insertMany(evenements);

    console.log("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error(" Seed error:", error);
    process.exit(1);
  }
};

runSeed();
