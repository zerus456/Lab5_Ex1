const express = require("express");
const router = express.Router();
const { Product } = require("../../models");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({
      action: "get_all_products",
      status: "success",
      Product: products
    });
  } catch (err) {
    res.status(500).json({
      action: "get_all_products",
      status: "error",
      Product: []
    });
  }
});

// GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product)
      return res.status(404).json({
        action: "get_product_by_id",
        status: "error",
        Product: {}
      });

    res.json({
      action: "get_product_by_id",
      status: "success",
      Product: product
    });
  } catch (err) {
    res.status(500).json({
      action: "get_product_by_id",
      status: "error",
      Product: {}
    });
  }
});

// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      action: "create_product",
      status: "success",
      Product: product
    });
  } catch (err) {
    res.status(500).json({
      action: "create_product",
      status: "error",
      Product: {}
    });
  }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    let product = await Product.findByPk(req.params.id);

    if (!product)
      return res.status(404).json({
        action: "update_product",
        status: "error",
        Product: {}
      });

    await product.update(req.body);

    res.json({
      action: "update_product",
      status: "success",
      Product: product
    });
  } catch (err) {
    res.status(500).json({
      action: "update_product",
      status: "error",
      Product: {}
    });
  }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findByPk(req.params.id);

    if (!product)
      return res.status(404).json({
        action: "delete_product",
        status: "error",
        Product: {}
      });

    await product.destroy();

    res.json({
      action: "delete_product",
      status: "success",
      Product: product
    });
  } catch (err) {
    res.status(500).json({
      action: "delete_product",
      status: "error",
      Product: {}
    });
  }
});

module.exports = router;
