// Resolvido o JWT
const jwt = require('jsonwebtoken');
const path = require('path');
const key = require('fs').readFileSync(path.resolve(__dirname, '../../../jwt.evaluation.key'));

const createToken = (payload) => {
  const token = jwt.sign({ payload }, key, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const data = jwt.verify(token, key);
    return { validated: true, data };
  } catch (error) {
    return { validated: false };
  }    
};

module.exports = { 
createToken,
validateToken,
};