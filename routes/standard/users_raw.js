const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM "User" ORDER BY "UserId" ASC`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM "User" WHERE "UserId" = $1`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { FullName, Address, RegistrationDate } = req.body;

    const result = await db.query(
      `INSERT INTO "User" ("FullName", "Address", "RegistrationDate")
       VALUES ($1, $2, $3) RETURNING *`,
      [FullName, Address, RegistrationDate]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const { FullName, Address, RegistrationDate } = req.body;

    const result = await db.query(
      `UPDATE "User"
       SET "FullName" = $1, "Address" = $2, "RegistrationDate" = $3
       WHERE "UserId" = $4
       RETURNING *`,
      [FullName, Address, RegistrationDate, req.params.id]
    );

    if (!result.rows.length) return res.status(404).json({ error: "Not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    const old = await db.query(
      `SELECT * FROM "User" WHERE "UserId" = $1`,
      [req.params.id]
    );

    if (!old.rows.length) return res.status(404).json({ error: "Not found" });

    await db.query(`DELETE FROM "User" WHERE "UserId" = $1`, [req.params.id]);

    res.json(old.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
