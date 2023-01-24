const md5 = require('md5');
const models = require('../../database/models');
const jwtUtils = require('../utils/jwt.utils');

const validateLogin = async (email, password) => {
  const user = await models.User.findOne({ where: { email } });
  if (!user) {
    return { type: 401, message: { message: 'Incorrect email or password' } };
  }
  const providedPass = md5(password);
  const dbPass = user.password;
  if (providedPass === dbPass) {
    const { password: _, ...payload } = user.dataValues;
    const token = jwtUtils.createToken(payload);
    return { type: 200, message: { ...payload, token } };
  } return { type: 401, message: { message: 'Incorrect email or password' } };
};

const createLogin = async (userInfo) => {
  const { email, name } = userInfo;
  const userWithSameEmail = Boolean(await models.User.findOne({ where: { email } }));
  const userWithSameName = Boolean(await models.User.findOne({ where: { name } }));
  if (userWithSameEmail || userWithSameName) {
    return { type: 409, message: { message: 'Name or email already exists' } };
  }
  await models.User.create({ ...userInfo, role: 'customer' });
  const { password: _, ...payload } = userInfo;
  payload.role = 'customer';
  const token = jwtUtils.createToken(payload);
  payload.token = token;
  return { type: 201, message: payload };
};

module.exports = {
  validateLogin,
  createLogin,
};
