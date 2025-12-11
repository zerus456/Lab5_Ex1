require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// ORM DATABASE SYNC
const { sequelize } = require("./models");

sequelize.sync({ alter: true })
  .then(() => console.log("ORM synced successfully"))
  .catch(err => console.error("ORM sync error:", err));

// RAW SQL ROUTES
app.use("/users", require("./routes/standard/users_raw"));
app.use("/products", require("./routes/standard/products_raw"));
app.use("/carts", require("./routes/standard/carts_raw"));

app.use("/orm/users", require("./routes/orm/users_orm"));
app.use("/orm/products", require("./routes/orm/products_orm"));
app.use("/orm/carts", require("./routes/orm/carts_orm"));

app.use("/email", require("./routes/email"));

app.use("/files", require("./routes/upload"));

app.use("/api/import-users", require("./routes/fetch_users"));




app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
