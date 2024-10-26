// backend/routes/products.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    console.log("these are products",products.rows);
    return res.json(products.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  console.log(req.body);
  try {
    const newProduct = await pool.query(
      'INSERT INTO mydata.products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, quantity]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    const updatedProduct = await pool.query(
      'UPDATE mydata.products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
      [name, description, price, quantity, id]
    );
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM mydata.products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
