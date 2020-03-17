const express = require("express");
const encryptPassword = require("../config/encryptPassword");
const User = require("../schemas/User");

const router = express.Router();

router.get("/api/users", async (req, res) => {
  let allUsers = await User.find();
  res.status(200).send(allUsers);
});

router.get("/api/users/id/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  res.status(200).send(user);
});

module.exports = router;
