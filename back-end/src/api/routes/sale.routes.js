const express = require('express');
const saleController = require('../controllers/sale.controller');
const authMiddleware = require('../middlewres/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, saleController.createSale);
router.get('/', authMiddleware, saleController.getSalesByUserId);
router.get('/:id', authMiddleware, saleController.getById);
router.put('/:id', authMiddleware, saleController.updateSale);

module.exports = router;