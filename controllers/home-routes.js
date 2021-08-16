const router = require("express").Router();
router.get("/", (req, res) => {
  const loggedIn = req.session.loggedIn;
  console.log(loggedIn);
<<<<<<< HEAD
  res.render("/", { loggedIn });
=======
  res.render("home", { loggedIn });
>>>>>>> 36b3854742c1b2957ec3f0c2b9561d9cf1fa181a
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

router.get("/signup", (req, res) => {
  res.json({ msg: "welcome to the signup" });
});

module.exports = router;
