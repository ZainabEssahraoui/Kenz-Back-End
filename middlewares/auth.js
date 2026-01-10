const jwt = require("jsonwebtoken");

// Middleware : vérifie que l'utilisateur est connecté
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Accès refusé : token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contient id et role du user
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};

// Middleware : vérifie que l'utilisateur est admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
  next();
};

// Exporter les deux middlewares
module.exports = { auth, isAdmin };
