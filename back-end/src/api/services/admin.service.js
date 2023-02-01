const { Op } = require('sequelize');
const models = require('../../database/models');

const getAllUsers = async () => {
  const users = await models.User.findAll({
    where: {
      role: {
        [Op.or]: ['seller', 'customer'],
      },
    },
  });
  if (!users) {
    return { type: 404, message: { message: 'No users found' } };
  }
  return { type: 200, message: users };
};

module.exports = { getAllUsers };