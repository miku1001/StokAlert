const pool = require('../config/db');

const createSale = async (req, res) => {
  const { product_id, quantity, sale_date } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const productCheck = await client.query(
      'SELECT * FROM products WHERE id = $1 AND store_id = $2',
      [product_id, req.user.store_id]
    );

    if (productCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Product Not Found' });
    }

    if (productCheck.rows[0].current_stock < quantity) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const result = await client.query(
      'INSERT INTO sales_records (product_id, quantity, sale_date) VALUES ($1, $2, $3) RETURNING *',
      [product_id, quantity, sale_date]
    );

    await client.query(
      'UPDATE products SET current_stock = current_stock - $1 WHERE id = $2',
      [quantity, product_id]
    );

    await client.query('COMMIT');

    res.status(201).json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: err.message });
  } finally {
    client.release();
  }
};

const getSalesByProduct = async (req, res) => {
  const { product_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT sr.* FROM sales_records sr
       JOIN products p ON sr.product_id = p.id
       WHERE sr.product_id = $1 AND p.store_id = $2
       ORDER BY sr.sale_date DESC`,
      [product_id, req.user.store_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sr.*, p.name AS product_name
       FROM sales_records sr
       JOIN products p ON sr.product_id = p.id
       WHERE p.store_id = $1
       ORDER BY sr.sale_date DESC`,
      [req.user.store_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createSale, getSalesByProduct, getAllSales };
