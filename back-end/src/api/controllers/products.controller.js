const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  try {
    const { type, message } = await productsService.getAll();
    return res.status(type).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Erro Servidor' });
  }
};

module.exports = { getAll };