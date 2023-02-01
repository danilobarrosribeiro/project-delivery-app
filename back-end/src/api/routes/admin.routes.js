const express = require('express');
const authMiddleware = require('../middlewres/auth.middleware');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.post('/register',
authMiddleware,
adminController.createSellerLogin);

router.get('/users',
authMiddleware,
adminController.getAllUsers);

module.exports = router;