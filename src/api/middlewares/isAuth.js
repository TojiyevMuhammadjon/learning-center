const jwt = require("../../libs/jwt");
const Teacher = require("../../models/teacher.model");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const user = jwt.verifyToken(token);
    const teacher = await Teacher.findByPk(user.id, { logging: false });

    if (teacher == null) {
      res.status(403).json({ message: "Not access" });
    } else {
      req.teacher = teacher;
      next();
    }
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = isAuth;
