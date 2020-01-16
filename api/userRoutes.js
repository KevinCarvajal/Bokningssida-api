const express = require("express")
const User = require("../schemas/User")

const router = express.Router()

//find all users
router.get("/api/users", async (req, res) => {
    let allUsers = await User.find()
    res.status(200).send(allUsers)
  })
//specific user id
  router.get("/api/users/id/:id", async (req, res) => {
    let user = await User.findById(req.params.id)
    res.status(200).send(user)
  })
  
  //delete a user
  router.delete("/api/users/delete", async (req, res) => {
    try {
      let userToDelete = await User.findById(req.body.id)
      userToDelete.delete()
      res.status(200).send("User found and deleted!")
    } catch (err) {
      res.send("No such user found")
    }
  })

  module.exports = router
