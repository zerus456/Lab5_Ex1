const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM "Product" ORDER BY "ProductId" ASC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM "Product" WHERE "ProductId" = $1`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const { ProductName, Price, ManufacturingDate } = req.body;

    const result = await db.query(
      `INSERT INTO "Product" ("ProductName", "Price", "ManufacturingDate")
       VALUES ($1, $2, $3) RETURNING *`,
      [ProductName, Price, ManufacturingDate]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const { ProductName, Price, ManufacturingDate } = req.body;

    const result = await db.query(
      `UPDATE "Product"
       SET "ProductName" = $1, "Price" = $2, "ManufacturingDate" = $3
       WHERE "ProductId" = $4
       RETURNING *`,
      [ProductName, Price, ManufacturingDate, req.params.id]
    );

    if (!result.rows.length) return res.status(404).json({ error: "Not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const old = await db.query(
      `SELECT * FROM "Product" WHERE "ProductId" = $1`,
      [req.params.id]
    );

    if (!old.rows.length) return res.status(404).json({ error: "Not found" });

    await db.query(`DELETE FROM "Product" WHERE "ProductId" = $1`, [
      req.params.id
    ]);

    res.json(old.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
