const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userSchema = new Schema({
  username: { type: String, unique: true, },
  role: { type: String, default: 'user' },
  password: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true },
  active: { type: Boolean, default: false },
  darkMode: { type: Boolean, default: false },
})

module.exports = mongoose.model("User", userSchema)