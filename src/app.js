const express = require("express");
const cors = require("cors");

const opportuniteRoutes = require("../routes/opportunite.routes");
const authRoutes = require("../routes/auth.routes");
const favoriRoutes = require("../routes/favori.routes");
const notificationRoutes = require("../routes/notification.routes");
const filtreRoutes = require("../routes/filter.routes");
const adminRoutes = require("../routes/admin.routes");
const commentaireRoutes = require("../routes/commentaire.routes");

require("../cron/deadlineNotification");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SERVER WORKS");
});
//les rourtes des différentes fonctionnalités
app.use("/api/favoris", favoriRoutes);
app.use("/api/opportunites", opportuniteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/filters", filtreRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/commentaires", commentaireRoutes);

module.exports = app;
