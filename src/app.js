const express = require('express');
const cors = require('cors');
const opportuniteRoutes = require("../routes/opportunite.routes");
const authRoutes = require("../routes/auth");


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true })); // optionnel mais recommandé
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('SERVER WORKS');
});

// routes

app.use("/api/opportunites", opportuniteRoutes);
app.use("/api/auth", authRoutes);


module.exports = app;
