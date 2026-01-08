const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/Notification.controller");
const { auth } = require("../middlewares/auth");

// Get all notifications
router.get("/:userId", auth, notificationController.getUserNotifications);

// Delete a notification
router.delete("/:notificationId", auth, notificationController.deleteNotification);

module.exports = router;
