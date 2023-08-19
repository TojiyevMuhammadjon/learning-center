const jwt = require("jsonwebtoken");
const config = require("config");

const generateToken = (payload) => {
  const secretKey = config.get("jwt_secret");
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token) => {
  const secretKey = config.get("jwt_secret");
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
