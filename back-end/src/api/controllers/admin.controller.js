const loginService = require('../services/login.service');

const createSellerLogin = async (req, res) => {
  const { role } = req.body.payload;
  if (role !== 'administrator') {
    return res.status(403).json({ message: 'You are not an admin' });
  }
  delete req.body.payload;
  const { type, message } = await loginService.createUser(req.body, req.body.role);
  res.status(type).json(message);
};

module.exports = {
  createSellerLogin,
};
