const Notification = require("../models/Notification");

/* ===========================
   GET MES NOTIFICATIONS
=========================== */
exports.getUserNotifications = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const userId = req.user.id;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error("Erreur getUserNotifications:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ===========================
   SUPPRIMER UNE NOTIFICATION
=========================== */
exports.deleteNotification = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const userId = req.user.id;
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification non trouvée ou accès refusé"
      });
    }

    res.json({ message: "Notification supprimée avec succès" });
  } catch (err) {
    console.error("Erreur deleteNotification:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
