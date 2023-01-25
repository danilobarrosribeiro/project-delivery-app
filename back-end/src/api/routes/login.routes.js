const express = require('express');
const loginController = require('../controllers/login');

const router = express.Router();

router.get('/', loginController.validateLogin);

router.post('/', loginController.createLogin);

module.exports = router;