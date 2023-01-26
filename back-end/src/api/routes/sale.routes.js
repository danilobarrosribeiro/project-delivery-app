const express = require('express');
const saleController = require('../controllers/sale.controller');
const authMiddleware = require('../middlewres/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, saleController.getAll);
router.post('/', authMiddleware, saleController.createSale);
router.get('/myorders', authMiddleware, saleController.getSalesByUserId);
router.get('/:id', authMiddleware, saleController.getById);

module.exports = router;