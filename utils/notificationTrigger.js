const Notification = require("../models/Notification");
const User = require("../models/User");

exports.notifyNewOpportunity = async (opportunite) => {
  const users = await User.find({}, "_id");

  const notifications = users.map(user => ({
    user: user._id,
    title: "Nouvelle opportunité",
    message: `Une nouvelle opportunité "${opportunite.titre}" est disponible.`,
    type: "NEW_OPPORTUNITY",
    opportunite: opportunite._id
  }));

  await Notification.insertMany(notifications);
};

