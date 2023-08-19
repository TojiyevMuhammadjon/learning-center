const Group = require("./group.model");
const Student = require("./student.model");
const Teacher = require("./teacher.model");
const GroupStudent = require("./groupstudent.model");
const taskexam = require("./taskExam.model");
const exam = require("./exam.model");

const setupRelationships = () => {
  // Define your relationships here
  Group.belongsToMany(Student, { through: GroupStudent });
  Student.belongsToMany(Group, { through: GroupStudent });

  Group.hasMany(GroupStudent, {
    foreignKey: "group_id",
  });
  Student.hasMany(GroupStudent, {
    foreignKey: "student_id",
  });

  taskexam.hasMany(Student, { foreignKey: "student_id" });
  Student.belongsTo(taskexam, { foreignKey: "task_id" });
  // Group.hasMany(exam, { foreignKey: "exam_id" });
  // exam.belongsTo(Group);

  Group.hasMany(exam, { foreignKey: "group_id" });
  exam.belongsTo(Group, { foreignKey: "group_id" });

  taskexam.belongsTo(exam, { foreignKey: "exam_id" }); // taskExam belongs to one exam
  exam.hasOne(taskexam, { foreignKey: "exam_id" }); // One exam has one taskExam


  Student.hasMany(taskexam, { foreignKey: "student_id" });
  taskexam.belongsTo(Student, { foreignKey: "student_id" });

  Group.hasMany(taskexam, { foreignKey: "group_id" });
  taskexam.belongsTo(Group, { foreignKey: "group_id" });

  
};

module.exports = setupRelationships;
