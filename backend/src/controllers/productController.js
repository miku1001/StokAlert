  const pool = require('../config/db');

  const getProducts = async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT p.*,
          COALESCE(
            (SELECT AVG(sr.quantity)
             FROM sales_records sr
             WHERE sr.product_id = p.id
             AND sr.sale_date >= NOW() - INTERVAL '30 days'),
            0
          ) AS avg_daily_sales
         FROM products p
         WHERE p.store_id = $1
         ORDER BY p.created_at DESC`,
        [req.user.store_id]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // create
  const createProduct = async (req, res) => {
    const {sku, name, current_stock, reorder_point, unit_cost } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO products (store_id, sku, name, current_stock, reorder_point, unit_cost)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [req.user.store_id, sku, name, current_stock, reorder_point, unit_cost]
      );
      res.status(201).json(result.rows[0])
    } catch (err) {
    res.status(500).json({message: err.message});
    }
  };

  //update product
  const updateProduct = async (req, res) => {
    const {id} =  req.params;
    const {sku, name, current_stock, reorder_point, unit_cost } = req.body;
    try {
      const result = await pool.query(
        `UPDATE products SET sku = $1, name = $2, current_stock = $3,
        reorder_point = $4, unit_cost = $5
        WHERE id = $6 AND store_id = $7 RETURNING *`,
        [sku, name, current_stock, reorder_point, unit_cost, id, req.user.store_id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({message:'Product Not Found'});
      }

      res.json({ message: 'Product Updated', product: result.rows[0] });
    } catch(err){
      res.status(500).json({message: err.message});
    }
  }

  //delete product
  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'DELETE FROM products WHERE id = $1 AND store_id = $2 RETURNING *',
        [id, req.user.store_id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = {getProducts, createProduct, updateProduct, deleteProduct};