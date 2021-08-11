const router = require("express").Router();
// const data = require("../public/javascript/crypto.js");
// console.log(data);
const test = { test: "test" };
router.get("/", (req, res) => {
  res.render("home", { test });
});

router.get("/login", (req, res) => {
  // if(req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("login");
});

module.exports = router;
