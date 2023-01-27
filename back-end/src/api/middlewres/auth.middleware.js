const jwtUtils = require('../utils/jwt.utils');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const { validated, data } = jwtUtils.validateToken(authorization);
  if (!validated) {
    return res.status(403).json({ message: 'You must provide a valid token' });
  }
  const { payload } = data;
  req.body.payload = payload;
  return next();
};

module.exports = authMiddleware;
