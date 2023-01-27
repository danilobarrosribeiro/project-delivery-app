const express = require('express');
const sellerController = require('../controllers/seller.controller');
const saleController = require('../controllers/sale.controller');
const authMiddleware = require('../middlewres/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, sellerController.getSalesBySellerId);
router.get('/:id', authMiddleware, saleController.getById);
router.put('/:id', authMiddleware, saleController.updateSale);

module.exports = router;