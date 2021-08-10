const router = require("express").Router();

const userRoutes = require("./user-routes");
const cryptoRoutes = require("./crypto-routes");

router.use("/users", userRoutes);
router.use("/cryptos", cryptoRoutes);

module.exports = router;
