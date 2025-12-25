const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER (USER ONLY)

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      educationLevel,
      studyDomain
    } = req.body;

    // Vérifications
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (!educationLevel || !studyDomain) {
      return res.status(400).json({
        message: "educationLevel and studyDomain are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
      profile: { educationLevel, studyDomain }
    });

    // Calcul profileCompletion
    const profileFields = ["educationLevel", "studyDomain", "phone", "destinationContinent", "secondaryDomain"];
    let filledFields = 0;
    for (let key of profileFields) {
      const value = user.profile[key];
      if (typeof value === "string" && value.trim() !== "") filledFields++;
    }
    user.profileCompletion = Math.round((filledFields / profileFields.length) * 100);

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      profileCompletion: user.profileCompletion,
      redirect: "/login"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// LOGIN

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const redirect = user.role === "admin" ? "/dashboard" : "/home";

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profileCompletion: user.role === "user" ? user.profileCompletion : null
      },
      redirect
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// Complete PROFILE 
router.post("/profile", async (req, res) => {
  try {
    const { userId, phone, destinationContinent, secondaryDomain } = req.body;

    if (!userId) return res.status(400).json({ message: "userId is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "user") {
      return res.status(403).json({ message: "Admins do not have profiles" });
    }

    user.profile.phone = phone || user.profile.phone;
    user.profile.destinationContinent = destinationContinent || user.profile.destinationContinent;
    user.profile.secondaryDomain = secondaryDomain || user.profile.secondaryDomain;

    // Recalcul du pourcentage de profil
    const profileFields = ["educationLevel", "studyDomain", "phone", "destinationContinent", "secondaryDomain"];
    let filledFields = 0;
    for (let key of profileFields) {
      const value = user.profile[key];
      if (typeof value === "string" && value.trim() !== "") filledFields++;
    }
    user.profileCompletion = Math.round((filledFields / profileFields.length) * 100);

    await user.save();

    res.json({
      message: "Profile updated successfully (POST)",
      profileCompletion: user.profileCompletion,
      profile: user.profile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// UPDATE Tout PROFILE 

router.put("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { educationLevel, studyDomain, phone, destinationContinent, secondaryDomain } = req.body;

    if (!userId) return res.status(400).json({ message: "userId is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "user") {
      return res.status(403).json({ message: "Admins do not have profiles" });
    }

    // Mise à jour champs obligatoires et optionnels
    user.profile.educationLevel = educationLevel || user.profile.educationLevel;
    user.profile.studyDomain = studyDomain || user.profile.studyDomain;
    user.profile.phone = phone || user.profile.phone;
    user.profile.destinationContinent = destinationContinent || user.profile.destinationContinent;
    user.profile.secondaryDomain = secondaryDomain || user.profile.secondaryDomain;

    // Recalcul profileCompletion
    const profileFields = ["educationLevel", "studyDomain", "phone", "destinationContinent", "secondaryDomain"];
    let filledFields = 0;
    for (let key of profileFields) {
      const value = user.profile[key];
      if (typeof value === "string" && value.trim() !== "") filledFields++;
    }
    user.profileCompletion = Math.round((filledFields / profileFields.length) * 100);

    await user.save();

    res.json({
      message: "Profile updated successfully",
      profileCompletion: user.profileCompletion,
      profile: user.profile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /user/:id
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      profile: user.profile,
      firstName: user.firstName,
      lastName: user.lastName,
      profileCompletion: user.profileCompletion 

    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
