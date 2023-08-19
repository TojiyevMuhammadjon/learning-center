const bcrypt = require("bcrypt");

const hash = async (payload) => {
  try {
    const hashedPassword = await bcrypt.hash(payload, 10);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const compare = async (hashedPass, payload) => {
  try {
    const isMatch = await bcrypt.compare(payload, hashedPass);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hash,
  compare,
};
