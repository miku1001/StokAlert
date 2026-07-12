const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const { createSale, getSalesByProduct } = require('../controllers/salesController');

router.use(checkAuth);

router.post('/', createSale);
router.get('/:product_id', getSalesByProduct);

module.exports = router;