const express = require('express');
const productsController = require('../controllers/products.controller');

const routers = express.Router();

routers.get('/', productsController.getAll);

module.exports = routers;