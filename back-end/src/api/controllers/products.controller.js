const productsService = require('../services/products.service');

const getAll = async (req, res) => {
    const { type, message } = await productsService.getAll();
  
    return res.status(type).json(message);
};

module.exports = { getAll };