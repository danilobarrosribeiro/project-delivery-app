const express = require('express');
const loginRoutes = require('./login.routes');
const productsRouter = require('./products.routes');
const registerRoutes = require('./register.routes');
const adminRoutes = require('./admin.routes');

const routers = express.Router();

routers.use('/customer/products', productsRouter);
routers.use('/login', loginRoutes);
routers.use('/register', registerRoutes);
routers.use('/admin', adminRoutes);
module.exports = routers;