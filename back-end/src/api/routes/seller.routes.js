const express = require('express');
const sellerController = require('../controllers/seller.controller');
const saleController = require('../controllers/sale.controller');
const authMiddleware = require('../middlewres/auth.middleware');

const router = express.Router();
router.get('/', authMiddleware, sellerController.getAllSellers);
router.get('/orders', authMiddleware, sellerController.getSalesBySellerId);
router.get('/orders/:id', authMiddleware, saleController.getById);
router.put('/orders/:id', authMiddleware, saleController.updateSale);

module.exports = router;