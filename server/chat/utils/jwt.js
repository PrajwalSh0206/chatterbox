const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const verifyToken = (token, logger) => {
  try {
    const isVerified = jwt.verify(token, SECRET_KEY);
    return isVerified;
  } catch (error) {
    logger.error(`Token Validation Failed`, JSON.stringify(error));
    return false;
  }
};

module.exports = { createToken, verifyToken };
