const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

// IMPORT MODELS
const User = require("./User")(sequelize);
const Product = require("./Product")(sequelize);
const ShoppingCart = require("./ShoppingCart")(sequelize);
const ExternalUser = require("./ExternalUser")(sequelize);

// RELATIONS
User.hasMany(ShoppingCart, { foreignKey: "UserId" });
ShoppingCart.belongsTo(User, { foreignKey: "UserId" });

Product.hasMany(ShoppingCart, { foreignKey: "ProductId" });
ShoppingCart.belongsTo(Product, { foreignKey: "ProductId" });

module.exports = { 
  sequelize, 
  User, 
  Product, 
  ShoppingCart, 
  ExternalUser 
};
