const { Sale } = require('../../database/models');

  const getSalesBySellerId = async (sellerId) => {
    const result = await Sale.findAll({
      where: {
        sellerId,
      },
    });
    if (!result) {
      return { type: 404, message: { message: 'Pedido não cadastrado' } };
    }

    return { type: 200, message: result };
  };

  module.exports = {
    getSalesBySellerId,
  };