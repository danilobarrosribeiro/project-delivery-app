const loginService = require('../services/login.service');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService.validateLogin(email, password);
  res.status(type).json(message);
};

const createCustomerLogin = async (req, res) => {
  const userInfo = req.body;
  const { type, message } = await loginService.createUser(userInfo, 'customer');
  res.status(type).json(message);
};

module.exports = {
  validateLogin,
  createCustomerLogin,
};
