const { Model, DataTypes } = require("sequelize");
const sequelize = require("../api/database/index");

class exam extends Model {}

exam.init(
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "exam",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = exam;
