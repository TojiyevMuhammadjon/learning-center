const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../api/database/index");

class result extends Model {}

result.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mark: {
      type: DataTypes.STRING,
      allowNull: false,
      // autoIncrement: true,

    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "result",
    timestamps: true,
    // underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = result;
