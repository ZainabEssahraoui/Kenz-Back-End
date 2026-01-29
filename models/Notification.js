const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  message: String,
  type: {
    type: String,
    enum: ["NEW_OPPORTUNITY", "DEADLINE_SOON"]
  },
  opportunite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunite"
  }
}, 
{ timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
