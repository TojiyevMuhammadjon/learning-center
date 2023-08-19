const GroupStudent = require("../../models/groupstudent.model");
const Group = require("../../models/group.model");
const Teacher = require("../../models/teacher.model");
const Student = require("../../models/student.model");

const addGroup = async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new group using the Group model
    const newGroup = await Group.create({ name });

    res.status(200).json({ message: "Group created successfully", newGroup });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the group" });
  }
};

const getGroupStudents = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Find the group by ID and include associated GroupStudent records
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: GroupStudent,
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json({ group });
  } catch (error) {
    console.error("Error retrieving group students:", error.message);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};

const addStudentToGroup = async (req, res) => {
  const { group_id, student_id } = req.body;

  try {
    // Find the group and student by their IDs
    const group = await Group.findByPk(group_id);
    const student = await Student.findByPk(student_id);

    if (!group || !student) {
      return res.status(404).json({ error: "Group or student not found" });
    }

    // Add the student to the group using GroupStudent model
    await GroupStudent.create({ group_id, student_id });

    res.status(200).json({ message: "Student added to group successfully" });
  } catch (error) {
    console.error("Error adding student to group:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding student to group" });
  }
};

module.exports = {
  addGroup,
  getGroupStudents,
  addStudentToGroup,
};
