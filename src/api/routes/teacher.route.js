const { Router } = require("express");
const {
  addTeacher,
  checkTeacher,
} = require("../controllers/teacher.controller");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/add/teacher", addTeacher);
router.post("/teacher/login", checkTeacher);

module.exports = router;
