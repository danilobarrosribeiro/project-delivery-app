const express = require('express');

const productsRouter = require('./routerProducts');

const routers = express.Router();

routers.use('/products', productsRouter);


module.exports = routers;