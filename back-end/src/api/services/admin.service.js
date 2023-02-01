// const { Op } = require('sequelize');
const models = require('../../database/models');

const getAllUsers = async () => {
  const users = await models.User.findAll();
  const customersAndSellers = users.map((user) => user.dataValues)
    .filter((user) => user.role !== 'administrator');
  if (!users) {
    return { type: 404, message: { message: 'No users found' } };
  }
  console.log(customersAndSellers);
  return { type: 200, message: customersAndSellers };
};

module.exports = { getAllUsers };