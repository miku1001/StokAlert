const pool = require('../config/db');

const getEvents = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE store_id = $1 ORDER BY event_date ASC',
      [req.user.store_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEvent = async (req, res) => {
  const { name, event_date, impact_multiplier } = req.body;

  if (!name || !event_date) {
    return res.status(400).json({ message: 'Name and event date are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (store_id, name, event_date, impact_multiplier)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.store_id, name, event_date, impact_multiplier || 1.0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, event_date, impact_multiplier } = req.body;

  try {
    const result = await pool.query(
      `UPDATE events SET name = $1, event_date = $2, impact_multiplier = $3
       WHERE id = $4 AND store_id = $5 RETURNING *`,
      [name, event_date, impact_multiplier, id, req.user.store_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM events WHERE id = $1 AND store_id = $2 RETURNING *',
      [id, req.user.store_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
