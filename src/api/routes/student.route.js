const { Router } = require("express");
const {
  addStudent,
  studentLogin,
  getStudentGroup,
} = require("../controllers/student.controller");

const isStudent = require("../middlewares/isStudent");

const router = Router();

router.post("/add/student", addStudent);
router.post("/student/login", studentLogin);

router.get("/students/:studentId", getStudentGroup);

module.exports = router;
