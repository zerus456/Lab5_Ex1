const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("Product", {
    ProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductName: {
      type: DataTypes.STRING(100),
    },
    Price: {
      type: DataTypes.DECIMAL(10,2),
    },
    ManufacturingDate: {
      type: DataTypes.DATE,
    },
  });

  return Product;
};
