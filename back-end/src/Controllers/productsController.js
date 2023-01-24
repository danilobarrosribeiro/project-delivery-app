const productsService = require('../Services/productsService');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Erro Servidor' });
  }
};

module.exports = { getAll };