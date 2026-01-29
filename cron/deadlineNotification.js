const cron = require("node-cron");
const Opportunite = require("../models/Opportunite");
const Notification = require("../models/Notification");
const User = require("../models/User");

cron.schedule("* * * * *", async () => {
  const today = new Date();
  const limitDate = new Date();
  limitDate.setDate(today.getDate() + 5);

  const opportunities = await Opportunite.find({
    dateLimite: { $gte: today, $lte: limitDate }
  });

  const users = await User.find({}, "_id");

  for (const opp of opportunities) {
    for (const user of users) {
      const alreadyNotified = await Notification.findOne({
        user: user._id,
        opportunite: opp._id,
        type: "DEADLINE_SOON"
      });

      if (!alreadyNotified) {
        await Notification.create({
          user: user._id,
          title: "Date limite proche",
          message: `L'opportunité "${opp.titre}" se termine dans 5 jours.`,
          type: "DEADLINE_SOON",
          opportunite: opp._id
        });
      }
    }
  }
});
