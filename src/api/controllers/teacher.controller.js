const { hash } = require("../../libs/bcrypt");
const Teacher = require("../../models/teacher.model");
const { generateToken } = require("../../libs/jwt");
const { compare } = require("bcrypt");

const addTeacher = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const hashedPass = await hash(password, 10);

    const newTeacher = await Teacher.create({
      name,
      username,
      password: hashedPass,
    });

    const token = generateToken({ id: newTeacher.id });
    // Assuming you need to include the teacher's ID in the payload
    res.cookie("token", token);
    console.log(req.cookie);

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: newTeacher,
      token: token,
    });
  } catch (error) {
    console.error("Error creating teacher:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the teacher" });
  }
};

const checkTeacher = async (req, res) => {
  const { username, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ username: username });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const passwordIs = await compare(password, teacher.password);
    if (!passwordIs)
      return res.status(404).json({ message: "Password is incorrect" });

    const token = generateToken({ id: teacher.id });

    res.cookie("token", token);   

    res.status(200).json({ message: "success", token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTeacher,
  checkTeacher,
};
