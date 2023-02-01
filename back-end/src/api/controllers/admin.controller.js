const loginService = require('../services/login.service');
const adminService = require('../services/admin.service');

const createSellerLogin = async (req, res) => {
  const { role } = req.body.payload;
  if (role !== 'administrator') {
    return res.status(403).json({ message: 'You are not an admin' });
  }
  delete req.body.payload;
  const { type, message } = await loginService.createUser(req.body, req.body.role);
  res.status(type).json(message);
};

const getAllUsers = async (req, res) => {
  const { role } = req.body.payload;
  if (role !== 'administrator') {
    return res.status(403).json({ message: 'You are not an admin' });
  }
  const { type, message } = await adminService.getAllUsers();
  res.status(type).json(message);
};

module.exports = {
  createSellerLogin,
  getAllUsers,
};
