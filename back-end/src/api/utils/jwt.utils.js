const jwt = require('jsonwebtoken');
const jwtKey = require("fs")
  .readFileSync("../../../jwt.evaluation.key", { encoding: "utf-8" });

const createToken = (payload) => {
  const token = jwt.sign({ payload }, jwtKey, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const data = jwt.verify(token, jwtKey);
    return { validated: true, data };
  } catch (error) {
    return { validated: false };
  }
};

module.exports = { 
createToken,
validateToken,
};