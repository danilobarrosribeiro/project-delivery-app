const express = require('express');

const productsRouter = require('./productsRouter');

const routers = express.Router();

routers.use('/customer/products', productsRouter);


module.exports = routers;