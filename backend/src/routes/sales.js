const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const { createSale, getSalesByProduct, getAllSales } = require('../controllers/salesController');

router.use(checkAuth);

router.get('/', getAllSales);
router.post('/', createSale);
router.get('/:product_id', getSalesByProduct);

module.exports = router;