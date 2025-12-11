const express = require("express");
const router = express.Router();
const { User } = require("../../models");

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      action: "get_all_users",
      status: "success",
      User: users
    });
  } catch (err) {
    res.status(500).json({ action: "get_all_users", status: "error", User: [] });
  }
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({
        action: "get_user_by_id",
        status: "error",
        User: {}
      });

    res.json({
      action: "get_user_by_id",
      status: "success",
      User: user
    });
  } catch (err) {
    res.status(500).json({ action: "get_user_by_id", status: "error", User: {} });
  }
});

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json({
      action: "create_user",
      status: "success",
      User: user
    });
  } catch (err) {
    res.status(500).json({ action: "create_user", status: "error", User: {} });
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({
        action: "update_user",
        status: "error",
        User: {}
      });

    await user.update(req.body);

    res.json({
      action: "update_user",
      status: "success",
      User: user
    });
  } catch (err) {
    res.status(500).json({ action: "update_user", status: "error", User: {} });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({
        action: "delete_user",
        status: "error",
        User: {}
      });

    await user.destroy();

    res.json({
      action: "delete_user",
      status: "success",
      User: user
    });
  } catch (err) {
    res.status(500).json({ action: "delete_user", status: "error", User: {} });
  }
});

module.exports = router;
