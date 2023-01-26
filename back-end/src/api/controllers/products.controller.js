const { validateToken } = require('../utils/jwt.utils');

const productsService = require('../services/products.service');

const getAll = async (req, res) => {
  try {
    const token = validateToken(req.headers.authorization);
    if (!token.validated) return res.status(401).json({ message: 'Token inválido' });
    const { type, message } = await productsService.getAll();
  
    return res.status(type).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Erro Servidor' });
  }
};

module.exports = { getAll };