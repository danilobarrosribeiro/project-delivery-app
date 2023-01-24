'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'products',
      [
        { name: 'Heineken', price: 4.59, url_image: 'https://gbarbosa.vtexassets.com/arquivos/ids/166157-1200-auto?v=637859929596830000&width=1200&height=auto&aspect=true' },
        { name: 'Skol', price: 2.99, url_image: 'https://images-americanas.b2w.io/produtos/01/00/img/47974/3/47974319_1GG.jpg' },
        { name: 'Brahma', price: 2.99, url_image: 'https://www.imigrantesbebidas.com.br/img/bebida/images/products/full/131-cerveja-brahma-lata-350ml.jpg?s=59f260b5b86f5c3606fa2e7de9ce40f3' },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
