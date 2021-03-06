const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  view: { type: Schema.Types.ObjectId, ref: "View" },
  bookingId: { type: String, unique: true },
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Bookning", bookingSchema)