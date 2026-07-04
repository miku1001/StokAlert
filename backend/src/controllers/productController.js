const pool = require('../config/db');

// get all product
const getProducts = (res, req) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE store_id = $1 ORDER BY created_at DESC',
      [req.user.store_id]
    );
    res.json(result.rows);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

// create
const createProduct = (res, req) => {
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
const updateProduct = (res, req) => {
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