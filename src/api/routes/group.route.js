const { Router } = require("express");
const {
  addGroup,
  addStudentToGroup,
  getGroupStudents,
} = require("../controllers/group.controller");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/add/group", isAuth, addGroup); // should put isAuth for all groups
router.get("/groups/:groupId", isAuth, getGroupStudents);
router.post("/add/student/group", isAuth, addStudentToGroup);

module.exports = router;
