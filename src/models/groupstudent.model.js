const { Model, DataTypes } = require("sequelize");
const sequelize = require("../api/database/index");

class GroupStudents extends Model {}

GroupStudents.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // task_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
  },
  {
    sequelize,
    tableName: "groupstudent",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: false,
  }
);

module.exports = GroupStudents;
