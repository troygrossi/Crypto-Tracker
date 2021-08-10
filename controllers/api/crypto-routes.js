const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Crypto } = require("../../models");

router.get("/", (req, res) => {
  Crypto.findAll({
    attributes: ["id", "crypto_name"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCryptoData) => res.json(dbCryptoData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Crypto.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "crypto_name"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCryptoData) => {
      if (!dbCryptoData) {
        res.status(404).json({ message: "No crypto found with this id" });
      }
      res.json(dbCryptoData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Crypto.create({
    crypto_name: req.body.crypto_name,
    user_id: req.body.user_id, //this will be changed to req.session.user_id when session is set up
  })
    .then((dbCryptoData) => res.json(dbCryptoData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Crypto.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCryptoData) => {
      if (!dbCryptoData) {
        res.status(404).json({ message: "No crypto found with this id" });
      }
      res.json(dbCryptoData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
