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
    await Promise.all(
      products.map(async (obj) => {
        await SaleProduct.create({
          saleId: id,
          productId: obj.productId,
          quantity: obj.quantity,
        });
        return null;
      }),
    );

    return { type: 200, message: '' };
  };
  
  const createSale = async (order) => {
    const {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
   } = order;
    const { id } = await Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: new Date(),
      status: 'pendente',
    });
    await createProductSale(id, products);
  };

module.exports = {
  getAll,
  getById,
  createSale,
};

// https://stackoverflow.com/questions/64390713/asynchronous-verification-within-the-map-function/
