const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/Notification.controller");

// Get all notifications
router.get("/:userId", notificationController.getUserNotifications);

// Delete a notification
router.delete("/:notificationId", notificationController.deleteNotification);

module.exports = router;
