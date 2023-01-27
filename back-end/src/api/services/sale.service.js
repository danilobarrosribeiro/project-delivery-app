const { Sale, SaleProduct } = require('../../database/models');

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

  const createProductSale = async (id, products) => {
    Promise.all(
      products.map(async ({ productId, quantity }) => {
        await SaleProduct.create({
          saleId: id,
          productId,
          quantity,
        });
      }),
    );
  };
  
  const createSale = async (order) => {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = order;
    const newDate = new Date();

    const data = await Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: newDate,
      status: 'pendente',
    });
    await createProductSale(data.id, products);
    return { type: 200, message: data };
  };

  const getSalesByUserId = async (userId) => {
    const result = await Sale.findAll({
      where: {
        userId,
      },
    });
    console.log(result);

    return { type: 200, message: result };
  };

module.exports = {
  getAll,
  getById,
  createSale,
  getSalesByUserId,
};

// https://stackoverflow.com/questions/64390713/asynchronous-verification-within-the-map-function/
