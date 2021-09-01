const router = require("express").Router();
router.get("/", (req, res) => {
  //const loggedIn = req.session.loggedIn;
  const userId = req.session.user_id;
  res.render("home", { loggedIn: req.session.loggedIn, userId });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/profile", (req, res) => {
  const userId = req.session.user_id;
  const loggedIn = req.session.loggedIn;
  res.render("profile", { loggedIn, userId });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
