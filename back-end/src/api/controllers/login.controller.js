const loginService = require('../services/login.service');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService.validateLogin(email, password);
  res.status(type).json(message);
};

const createLogin = async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  const { type, message } = await loginService.createLogin(userInfo);
  res.status(type).json(message);
};

module.exports = {
  validateLogin,
  createLogin,
};