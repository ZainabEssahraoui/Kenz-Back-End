const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/Notification.controller");
const { auth } = require("../middlewares/auth");

// Récupérer MES notifications
router.get("/", auth, notificationController.getUserNotifications);

// Supprimer une notification
router.delete("/:notificationId", auth, notificationController.deleteNotification);

module.exports = router;
