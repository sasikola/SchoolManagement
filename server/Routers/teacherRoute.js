const express = require("express");
const Teacher = require("../Models/teacherModel");
const teacherRouter = express.Router();

// const isTeacherMiddleware = (req, res, next) => {
//   if (req.user.isTeacher) {
//     next(); // User is a teacher, proceed to the next middleware or route handler
//   } else {
//     res.status(403).json({ error: "Unauthorized access", success: false });
//   }
// };

// teacherRouter.use(isTeacherMiddleware);

teacherRouter.post("/sendTeacher", async (req, res) => {
  try {
    const { name, subject } = req.body;
    const teacher = new Teacher({ name, subject });
    await teacher.save();
    res
      .status(201)
      .json({ message: "Teacher added successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

teacherRouter.get("/getTeacher", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

teacherRouter.put("/updateTeacher/:id", async (req, res) => {
  try {
    const { name, subject } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, subject },
      { new: true } // Return the updated document
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

teacherRouter.delete("/deleteTeacher/:id", async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({
      message: "Teacher deleted successfully",
      teacher: deletedTeacher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = teacherRouter;
