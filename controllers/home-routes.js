const router = require("express").Router();
const test = { test: "test" };
router.get("/", (req, res) => {
  res.render("home", { test });
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
  res.render(`profile`, { userId });
});

module.exports = router;
