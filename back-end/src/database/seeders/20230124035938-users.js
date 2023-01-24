'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        { name: 'Ronaldo', email: 'ronaldo@ronaldo.com', password: '123456789', role: 'admin' },
        { name: 'Cassio', email: 'cassio@cassio.com', password: '123456789', role: 'seller' },
        { name: 'Tite', email: 'tite@tite.com', password: '123456789', role: 'customer' },
        { name: 'Neto', email: 'neto@neto.com', password: '123456789', role: 'customer' },
        { name: 'Romero', email: 'romero@romero.com', password: '123456789', role: 'seller' },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
