const mongoose = require("mongoose")
const Schema = mongoose.Schema

let SalongSchema = new Schema({
  name: { type: String},
  role: { type: String}
})

module.exports = mongoose.model("Salong", SalongSchema)