const { compare } = require("bcrypt");
const { hash } = require("../../libs/bcrypt");
const { generateToken } = require("../../libs/jwt");
const Group = require("../../models/group.model");
const Student = require("../../models/student.model");
const GroupStudent = require("../../models/groupstudent.model");

// const addStudentsToGroup = async (req, res) => {
//   const { groupId, studentIds } = req.body;

//   try {
//     // Find the group by its ID
//     const group = await Group.findByPk(groupId);
//     if (!group) {
//       return res.status(404).json({ error: "Group not found" });
//     }

//     // Find the students by their IDs
//     const students = await Student.findAll({
//       where: {
//         id: studentIds,
//       },
//     });

//     // Add the students to the group
//     await group.addStudents(students);

//     res.status(200).json({ message: "Students added to group successfully" });
//   } catch (error) {
//     console.error("Error adding students to group:", error.message);
//     res.status(500).json({ error: "An error occurred while adding students" });
//   }
// };

const addStudent = async (req, res) => {
  const { name, username, password } = req.body;
  console.log(req.body);
  try {
    const hashedPass = await hash(password);
    const newStudent = await Student.create({
      name,
      username,
      password: hashedPass,
    });
    const token = generateToken({ id: newStudent.id });
    console.log(newStudent);

    res.cookie("token", token);
    res.status(200).json({
      message: "Student added successfully",
      newStudent,
      token: token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const studentLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const student = await Student.findOne({ where: { username: username } });

    if (!student) return res.status(404).json({ message: "Student not found" });
    const passwordIs = await compare(password, student.password);
    if (!passwordIs)
      return res.status(403).json({ message: "password is incorrect" });

    const token = generateToken({ id: student.id });

    res.cookie("token", token);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentGroup = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findByPk(studentId, {
      include: [
        {
          model: GroupStudent,
        },
      ],
    });

    if (!student) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error("Error retrieving group students:", error.message);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};

module.exports = {
  getStudentGroup,
  addStudent,
  studentLogin,
};
