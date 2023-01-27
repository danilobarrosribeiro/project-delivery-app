const express = require('express');
const productsController = require('../controllers/products.controller');
const authMiddleware = require('../middlewres/auth.middleware');

const routers = express.Router();

routers.get('/', authMiddleware, productsController.getAll);

module.exports = routers;