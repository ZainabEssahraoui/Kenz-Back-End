const express = require('express');
const cors = require('cors');
const opportuniteRoutes = require("../routes/opportunite.routes");

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

module.exports = app;
