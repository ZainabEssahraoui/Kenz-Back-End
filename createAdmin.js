require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adapte le chemin si besoin

const createAdmin = async () => {
  try {
    // 1️⃣ Connexion MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");

    // 2️⃣ Infos admin
    const adminData = {
      firstName: "Super",
      lastName: "Admin",
      email: "admin@test.com",
      password: "admin123",
      role: "admin"
    };

    // 3️⃣ Vérifier si admin existe
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️ Admin existe déjà");
      process.exit(0);
    }

    // 4️⃣ Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // 5️⃣ Créer admin
    const admin = new User({
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("🔥 ADMIN CRÉÉ AVEC SUCCÈS");
    console.log({
      email: adminData.email,
      password: adminData.password
    });

    process.exit(0);

  } catch (error) {
    console.error("❌ Erreur création admin :", error);
    process.exit(1);
  }
};

createAdmin();
