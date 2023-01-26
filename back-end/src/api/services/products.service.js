const { Product } = require('../../database/models');

const getAll = async () => {
  const products = await Product.findAll();

  return { type: 200, message: products };
};

module.exports = {
  getAll,
};
