const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  const token = jwt.sign({ payload }, 'SECRET', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const data = jwt.verify(token, 'SECRET');
    return { validated: true, data };
  } catch (error) {
    return { validated: false };
  }    
};

module.exports = { 
createToken,
validateToken,
};