const { createUser } = require('../services/login.service');

const createSellerLogin = async (req, res) => {
  const { role } = req.body.payload;
  if (role !== 'administrator') {
    return res.status(403).json({ message: 'You are not an admin' });
  }
  const { type, message } = await createUser(req.body, 'seller');
  delete message.payload;
  res.status(type).json(message);
};

module.exports = {
  createSellerLogin,
};
