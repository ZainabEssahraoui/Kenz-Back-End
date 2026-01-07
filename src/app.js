const express = require("express");
const cors = require("cors");
const opportuniteRoutes = require("../routes/opportunite.routes");
const authRoutes = require("../routes/auth.routes");
const favoriRoutes = require("../routes/favori.routes");
const commentaireRoutes = require("../routes/commentaire.routes"); // <-- nouveau

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SERVER WORKS");
});

app.use("/api/favoris", favoriRoutes);
app.use("/api/opportunites", opportuniteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/commentaires", commentaireRoutes); // <-- nouveau

module.exports = app;
