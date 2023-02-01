'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'sales',
      [
        { user_id: 3, seller_id: 2, total_price: 8.97, delivery_address: 'Rua x', delivery_number: '10', sale_date: new Date(), status: 'Pendente' },
        { user_id: 3, seller_id: 2, total_price: 7.58, delivery_address: 'Rua x', delivery_number: '10', sale_date: new Date(), status: 'Pendente' },
        { user_id: 3, seller_id: 2, total_price: 16.76, delivery_address: 'Rua x', delivery_number: '10', sale_date: new Date(), status: 'Pendente' },
        { user_id: 3, seller_id: 2, total_price: 18.15, delivery_address: 'Rua x', delivery_number: '10', sale_date: new Date(), status: 'Pendente' },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};