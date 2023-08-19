const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../api/database/index");

class Group extends Model {}

Group.init(
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
  },
  {
    sequelize,
    tableName: "groups",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: false,
  }
);

module.exports = Group;
