const jwt = require('jsonwebtoken');

const userFromToken = (req) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null ;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

module.exports = userFromToken;
