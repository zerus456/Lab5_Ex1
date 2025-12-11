const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FullName: {
      type: DataTypes.STRING(100),
    },
    Address: {
      type: DataTypes.STRING(200),
    },
    RegistrationDate: {
      type: DataTypes.DATE,
    },
  });

  return User;
};
