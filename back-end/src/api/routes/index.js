const express = require('express');
const loginRoutes = require('./login.routes');
const productsRouter = require('./products.routes');

const routers = express.Router();

routers.use('/customer/products', productsRouter);
routers.use('/login', loginRoutes);
module.exports = routers;