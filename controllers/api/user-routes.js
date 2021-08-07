const router = require("express").Router();
const { User } = require("../../models");

//get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["username", "password"],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get one user

//create a user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update a user

//delete a user

module.exports = router;
