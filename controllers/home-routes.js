const router = require("express").Router();
router.get("/", (req, res) => {
  const loggedIn = req.session.loggedIn;
  console.log(loggedIn);
  res.render("/", { loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/signup", (req, res)=>{
  res.json({msg: "welcome to the signup"})
});

module.exports = router;
