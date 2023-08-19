const { Model, DataTypes, Sequelize } = require("sequelize");
// const sequelize = new Sequelize(
//   "postgres://postgres:muhammad2959@localhost:5432/school"
// );

const sequelize = require("../api/database/index")
class Teacher extends Model {}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "teacher",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: false,
  }
);

module.exports = Teacher;
