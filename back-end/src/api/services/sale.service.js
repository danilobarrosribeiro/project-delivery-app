const { Sale, SaleProduct, Product } = require('../../database/models');

  const mountSaleProducts = (products, productsOrder) => {
    console.log(products);
    const productsWithQuantity = products.map((product) => {
      let productWithQuantity = product;
      productsOrder.forEach((element) => {
        if (element.productId === product.id) {
          productWithQuantity = { ...product, quantity: element.quantity };
        }
      });
      return productWithQuantity;
    });
    return productsWithQuantity;
  };

  const getById = async (id) => {
    const order = await Sale.findOne({ where: { id }, raw: true, nest: true });
    if (!order) {
      return { type: 404, message: { message: 'Pedido não cadastrado' } };
    }

    const productsOrder = await SaleProduct.findAll({ where: { saleId: id } });
    const productsIdArray = productsOrder.map((productOrder) => productOrder.productId);

    const products = await Product.findAll({
        where: { id: productsIdArray }, nest: true, raw: true });

      const mountArray = mountSaleProducts(products, productsOrder);

      const result = {
        ...order,
        products: mountArray,
      };
  
    return { type: 200, message: result };
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
    if (!data) {
      return { type: 409, message: { message: 'Não foi possivel cadastrar o pedido' } };
    }

    await createProductSale(data.id, products);
    return { type: 200, message: data };
  };

  const getSalesByUserId = async (userId) => {
    const order = await Sale.findAll({
      where: {
        userId,
      },
    });
    if (!order) {
      return { type: 404, message: { message: 'Pedidos não cadastrado' } };
    }

    return { type: 200, message: order };
  };

  const updateSale = async (status, id, payload) => {
    const saleId = id;
    // const { role } = payload;
    const userId = payload.id;
    const sellerStatus = ['Em Trânsito', 'Preparando'];

    const sale = await Sale.findByPk(saleId);

    if (status === 'Entregue' && userId === sale.userId) {
      const result = await Sale.update({ status }, { where: { id: saleId } });

      return { type: 200, message: result };
    } if (sellerStatus.includes(status) && userId === sale.sellerId) {
      const result = await Sale.update({ status }, { where: { id: saleId } });

      return { type: 200, message: result };
    }

    return { type: 403, message: { message: 'Usuário não autorizado' } };
  };

module.exports = {
  getById,
  createSale,
  getSalesByUserId,
  updateSale,
};

// https://stackoverflow.com/questions/64390713/asynchronous-verification-within-the-map-function/
