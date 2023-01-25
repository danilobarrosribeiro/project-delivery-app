const { Sale } = require('../../database/models');

  const getAll = async () => {
    const orders = await Sale.findAll();
    if (!orders) {
      return { type: 404, message: { message: 'Não existe pedidos' } };
    }
  
    return { type: 200, message: orders };
  };

  const getById = async (id) => {
    const order = await Sale.findOne({ where: { id } });
    if (!order) {
      return { type: 404, message: { message: 'Pedido não cadastrado' } };
    }

    return { type: 200, message: order };
  };
  
  const createSale = async (order) => {
    const {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
   } = order;
    await Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: new Date(),
      status: 'pendente',
    });

    return { type: 201, message: { message: '' },
  };
  };
  
module.exports = {
  getAll,
  getById,
  createSale,
};