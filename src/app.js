const express = require('express');
const cors = require('cors');
const opportuniteRoutes = require("../routes/opportunite.routes");
const authRoutes = require("../routes/auth.routes");
const favoriRoutes = require("../routes/favori.routes");


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SERVER WORKS');
});

app.use("/api/favoris", favoriRoutes);
app.use("/api/opportunites", opportuniteRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
