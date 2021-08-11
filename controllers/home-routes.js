const router = require("express").Router();
// const data = require("../public/javascript/crypto.js");
// console.log(data);
const test = { test: "test" };
router.get("/", (req, res) => {
  res.render("home", { test });
});

module.exports = router;
