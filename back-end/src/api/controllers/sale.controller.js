const saleService = require('../services/sale.service');
const jwtUtils = require('../utils/jwt.utils');

const getAll = async (req, res) => {
  const { type, message } = await saleService.getAll();
  res.status(type).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getById(id);
  res.status(type).json(message);
};

const createSale = async (req, res) => {
  const { authorization } = req.headers;
  const validateToken = jwtUtils.validateToken(authorization);
  if (!validateToken) {
    res.status(401).json({ message: 'Token não autorizado' });
  } else {
  const order = req.body;

  const { type, message } = await saleService.createSale(order);

  res.status(type).json(message);
  }
};

module.exports = {
  getAll,
  getById,
  createSale,
};
