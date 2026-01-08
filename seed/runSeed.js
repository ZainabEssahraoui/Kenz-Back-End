const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Opportunite = require("../models/Opportunite");
const data = require("./opportunites.seed");

dotenv.config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(" Connected to MongoDB");

    await Opportunite.deleteMany({});
    console.log(" Old data removed");

    await Opportunite.insertMany(data);
    console.log(" Seed data inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error(" Seed error:", error);
    process.exit(1);
  }
};

runSeed();
