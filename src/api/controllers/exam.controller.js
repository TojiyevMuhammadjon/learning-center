const exam = require("../../models/exam.model");
const Group = require("../../models/group.model");
const Student = require("../../models/student.model");
const taskExam = require("../../models/taskExam.model");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
// const { where } = require("sequelize");
const Result = require("../../models/result.model");

const createExam = async (req, res) => {
  try {
    const { task, duration } = req.body;
    const { group_id } = req.params;
    const isGroup = await Group.findByPk(group_id);

    if (isGroup === null) {
      return res.json({ message: "Group is not found" });
    }

    const start_date = new Date();
    const end_date = new Date(new Date().getTime() + duration * 60 * 60 * 1000);

    const newExam = await exam.create({
      task,
      duration,
      start_date,
      end_date,
    });

    res.status(200).json({ message: "Success", newExam });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: error.message });
  }
};

const studentAnswer = async (req, res) => {
  try {
    const { group_id } = req.params;
    const { exam_id } = req.body;
    const { task } = req.files;

    console.log(group_id, exam_id);

    const group = await Group.findOne({
      where: { id: group_id },
      logging: false,
    });

    if (!group) {
      return res.status(403).json({ message: "Group not found" });
    }

    const fileName = `${uuid()}${path.extname(task.name)}`;
    task.mv(process.cwd() + "/uploads/" + fileName);

    const exams = await exam.findOne({
      where: { id: exam_id },
      logging: false,
    });
    if (exams.length === 0 || exams.end_date < new Date()) {
      const task = await taskExam.create({ task: fileName, logging: false });

      res.status(200).json({ message: "Success", task });
    } else {
      const task = await taskExam.create(
        {
          task: fileName,
          isActive: true,
          exam_id: exam_id,
          student_id: req.student.id,
        },
        { logging: false }
      );
      res.status(200).json({ message: "Success", task });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkExam = async (req, res) => {
  const { exam_id } = req.params;
  const { student_id, mark } = req.body;
  try {
    const isStudent = await Student.findByPk(student_id);
    if (!isStudent)
      return res.status(404).json({ message: "Student not found" });

    const result = await taskExam.findOne({ where: { exam_id: exam_id } });

    if (!result) return res.status(404).json({ message: "Task not found" });

    const newResult = await Result.create({
      mark: mark,
      exam_id: exam_id,
      student_id: student_id,
    });
    res
      .status(200)
      .json({ message: "mark is been created successfully", newResult });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await taskExam.findByPk(id, {
      where: { isActive: true },
      include: [Group],
    });
    if (tasks) {
      res.status(200).json({ messages: "Success", tasks });
    } else {
      res.status(404).json({ messages: "Not Found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createExam,
  studentAnswer,
  checkExam,
  getTask,
};
