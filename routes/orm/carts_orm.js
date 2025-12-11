const express = require("express");
const router = express.Router();
const { ShoppingCart, User, Product } = require("../../models");

// GET ALL CARTS
router.get("/", async (req, res) => {
  try {
    const carts = await ShoppingCart.findAll({
      include: [User, Product]
    });

    res.json({
      action: "get_all_carts",
      status: "success",
      ShoppingCart: carts
    });
  } catch (err) {
    res.status(500).json({
      action: "get_all_carts",
      status: "error",
      ShoppingCart: []
    });
  }
});

// GET CART BY ID
router.get("/:id", async (req, res) => {
  try {
    const cart = await ShoppingCart.findByPk(req.params.id, {
      include: [User, Product]
    });

    if (!cart)
      return res.status(404).json({
        action: "get_cart_by_id",
        status: "error",
        ShoppingCart: {}
      });

    res.json({
      action: "get_cart_by_id",
      status: "success",
      ShoppingCart: cart
    });
  } catch (err) {
    res.status(500).json({
      action: "get_cart_by_id",
      status: "error",
      ShoppingCart: {}
    });
  }
});

// CREATE CART
router.post("/", async (req, res) => {
  try {
    const cart = await ShoppingCart.create(req.body);

    res.json({
      action: "create_cart",
      status: "success",
      ShoppingCart: cart
    });
  } catch (err) {
    res.status(500).json({
      action: "create_cart",
      status: "error",
      ShoppingCart: {}
    });
  }
});

// UPDATE CART
router.put("/:id", async (req, res) => {
  try {
    let cart = await ShoppingCart.findByPk(req.params.id);

    if (!cart)
      return res.status(404).json({
        action: "update_cart",
        status: "error",
        ShoppingCart: {}
      });

    await cart.update(req.body);

    res.json({
      action: "update_cart",
      status: "success",
      ShoppingCart: cart
    });
  } catch (err) {
    res.status(500).json({
      action: "update_cart",
      status: "error",
      ShoppingCart: {}
    });
  }
});

// DELETE CART
router.delete("/:id", async (req, res) => {
  try {
    let cart = await ShoppingCart.findByPk(req.params.id);

    if (!cart)
      return res.status(404).json({
        action: "delete_cart",
        status: "error",
        ShoppingCart: {}
      });

    await cart.destroy();

    res.json({
      action: "delete_cart",
      status: "success",
      ShoppingCart: cart
    });
  } catch (err) {
    res.status(500).json({
      action: "delete_cart",
      status: "error",
      ShoppingCart: {}
    });
  }
});

module.exports = router;
