const { Model, DataTypes } = require("sequelize");
const sequelize = require("../api/database/index");

class taskExam extends Model {}

taskExam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    task: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "taskexam",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = taskExam;
