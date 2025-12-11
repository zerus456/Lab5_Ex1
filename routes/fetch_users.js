const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ExternalUser } = require("../models");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");

    // Map for model
    const importedUsers = await ExternalUser.bulkCreate(
      response.data.map(u => ({
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone,
        website: u.website
      }))
    );

    res.json({
      action: "fetch_and_save_api_users",
      status: "success",
      imported: importedUsers
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      action: "fetch_and_save_api_users",
      status: "error",
      imported: []
    });
  }
});

module.exports = router;
