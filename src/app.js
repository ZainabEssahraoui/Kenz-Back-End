const express = require('express');
const opportuniteRoutes = require("../routes/opportunite.routes");
const app = express();

app.get('/', (req, res) => {
  res.send(' SERVER WORKS');
});
app.use(express.urlencoded({ extended: true })); // optionnel mais recommandé
app.use(express.json());
app.use("/api/opportunites", opportuniteRoutes);

module.exports = app;
