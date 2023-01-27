const express = require('express');
const loginRoutes = require('./login.routes');
const productsRouter = require('./products.routes');
const registerRoutes = require('./register.routes');
const adminRoutes = require('./admin.routes');
const saleRoutes = require('./sale.routes');
const sellerRoutes = require('./seller.routes');

const routers = express.Router();

routers.use('/customer/products', productsRouter);
routers.use('/login', loginRoutes);
routers.use('/register', registerRoutes);
routers.use('/admin', adminRoutes);
routers.use('/customer/orders', saleRoutes);
routers.use('/seller', sellerRoutes);
module.exports = routers;