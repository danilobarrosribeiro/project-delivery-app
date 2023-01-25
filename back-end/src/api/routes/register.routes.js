const express = require('express');
const loginController = require('../controllers/login.controller');

const router = express.Router();

router.post('/', loginController.createLogin);

module.exports = router;