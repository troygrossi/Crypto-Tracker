const User = require("./User");
const Crypto = require("./Crypto");

User.hasMany(Crypto, {
  foreignKey: "user_id",
  onDelte: "SET NULL",
});

Crypto.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

module.exports = { User, Crypto };
