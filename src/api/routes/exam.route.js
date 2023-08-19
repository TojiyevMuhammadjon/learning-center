const { Router } = require("express");
const {
  createExam,
  studentAnswer,
  checkExam,
  getTask,
} = require("../controllers/exam.controller");
const isStudent = require("../middlewares/isStudent");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/exam/create/:group_id", isAuth, createExam);
router.post("/exam/student/:group_id", isStudent, studentAnswer);
router.get("/exam/task/:id",isAuth, getTask);
router.post("/exam/check/:exam_id", isAuth, checkExam);

module.exports = router;
