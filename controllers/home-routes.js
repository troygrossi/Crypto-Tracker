const router = require("express").Router();
// const { cryptoData } = require("../public/javascript/crypto.js");
// console.log(cryptoData);

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
