const express = require('express');
const saleController = require('../controllers/sale.controller');

const router = express.Router();

router.get('/', saleController.getAll);
router.get('/:id', saleController.getById);
router.post('/', saleController.createSale);
router.get('/myorders', saleController.getSalesByUserId);

module.exports = router;