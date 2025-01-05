const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const verifyToken = (token) => {
  const isVerified = jwt.verify(token, SECRET_KEY);
  return isVerified;
};

module.exports = { createToken, verifyToken };
