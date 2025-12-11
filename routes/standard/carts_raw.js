const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET ALL CART ITEMS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.*, u."FullName", p."ProductName"
      FROM "ShoppingCart" c
      JOIN "User" u ON c."UserId" = u."UserId"
      JOIN "Product" p ON c."ProductId" = p."ProductId"
      ORDER BY c."CartId" ASC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE CART ITEM
router.post("/", async (req, res) => {
  try {
    const { UserId, ProductId, Quantity } = req.body;

    const result = await db.query(
      `INSERT INTO "ShoppingCart" ("UserId", "ProductId", "Quantity")
       VALUES ($1, $2, $3) RETURNING *`,
      [UserId, ProductId, Quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE CART ITEM
router.put("/:id", async (req, res) => {
  try {
    const { UserId, ProductId, Quantity } = req.body;

    const result = await db.query(
      `UPDATE "ShoppingCart" 
       SET "UserId" = $1, "ProductId" = $2, "Quantity" = $3
       WHERE "CartId" = $4
       RETURNING *`,
      [UserId, ProductId, Quantity, req.params.id]
    );

    if (!result.rows.length) return res.status(404).json({ error: "Not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE CART ITEM
router.delete("/:id", async (req, res) => {
  try {
    const old = await db.query(
      `SELECT * FROM "ShoppingCart" WHERE "CartId" = $1`,
      [req.params.id]
    );

    if (!old.rows.length) return res.status(404).json({ error: "Not found" });

    await db.query(`DELETE FROM "ShoppingCart" WHERE "CartId" = $1`, [
      req.params.id
    ]);

    res.json(old.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
