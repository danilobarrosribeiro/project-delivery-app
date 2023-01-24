const express = require('express');
const productsController = require('../Controllers/productsController');

const routers = express.Router();

routers.get('/', productsController.getAll);

module.exports = routers;