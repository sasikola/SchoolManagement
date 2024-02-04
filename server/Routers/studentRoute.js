const express = require("express");
const Student = require("../Models/studentModel");
const studentRouter = express.Router();

// middleware to check if the user is student

const isStudentMiddleware = (req, res, next) => {
  console.log(req.body.user);
  console.log(req.user);
  if (req.user && req.user.isStudent) {
    return next();
  } else {
    res.status(403).json({ error: "Unauthorized access", success: false });
  }
};



studentRouter.post("/sendStudent", async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    const student = new Student({ name, age, grade });
    await student.save();
    res
      .status(201)
      .json({ message: "Student added successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

studentRouter.get("/getStudent", async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      message: "Student details fetched successfully",
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

studentRouter.put("/updateStudent/:id", async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, grade },
      { new: true } // Return the updated document
    );
    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: "Student not found", success: false });
    }
    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

studentRouter.delete("/deleteStudent/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = studentRouter;
