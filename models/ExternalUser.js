const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ExternalUser = sequelize.define("ExternalUser", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING
  });

  return ExternalUser;
};
