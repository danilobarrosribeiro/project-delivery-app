const loginService = require ('../services/login');


const validateLogin = async(req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService.validateLogin(email, password);
  res.status(type).json(message);
}

module.exports = {
  validateLogin,
}