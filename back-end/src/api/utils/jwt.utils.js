const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (payload) => {
  const token = jwt.sign({ payload }, JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return { validated: true, data };
  } catch (error) {
    return { validated: false };
  }
};

module.exports = { 
createToken,
validateToken,
};