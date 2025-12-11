const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ShoppingCart = sequelize.define("ShoppingCart", {
    CartId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  return ShoppingCart;
};
