const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:muhammad2959@localhost:5432/school",
  {
    logging: false,
    sync: true,
  }
);

module.exports = sequelize;
